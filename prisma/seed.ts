import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse';

const prisma = new PrismaClient();

type State = {
	State: string;
	Abbreviation: string;
};

type Store = {
	name: string;
	street_address: string;
	city: string;
	state: string;
	zip_code: string;
	country: string;
	phone_number_1: string;
	phone_number_2: string;
	fax_1: string;
	fax_2: string;
	email_1: string;
	email_2: string;
	website: string;
	open_hours: string;
	latitude: string;
	longitude: string;
	facebook: string;
	twitter: string;
	instagram: string;
	pinterest: string;
	youtube: string;
};

async function parseCSV<T>(filePath: string): Promise<T[]> {
	const csvFile = readFileSync(filePath, 'utf8');

	// Parse the CSV data
	return new Promise<T[]>((resolve, reject) => {
		parse(csvFile, { columns: true }, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

async function main() {
	// Load al states from the csv
	const csvStates = await parseCSV<State>('./data/states.csv');

	// For each one, do a prisma upsert to insert them if they are not already there
	for (const state of csvStates) {
		try {
			await prisma.state.upsert({
				where: {
					name: state.State,
				},
				update: {},
				create: {
					name: state.State,
					abbreviation: state.Abbreviation,
				},
			});
		} catch (error) {
			console.error('Failed to insert state:');
			console.error(error);
		}
	}

	// Load all stores from the csv
	const csvStores = await parseCSV<Store>('./data/subway.csv');

	// Or use this short list instead for testing
	// const csvStores = await parseCSV<Store>('./data/subway_short.csv');

	// For each one, do a prisma upsert to insert them if they are not already there
	for (const subway of csvStores) {
		try {
			await prisma.store.upsert({
				where: {
					street_address: subway.street_address,
				},
				update: {},
				create: {
					name: subway.name,
					street_address: subway.street_address,
					city: subway.city,
					state: {
						connect: {
							abbreviation: subway.state,
						},
					},
					zip_code: subway.zip_code,
					country: subway.country,
					phone_number_1: subway.phone_number_1,
					phone_number_2: subway.phone_number_2,
					fax_1: subway.fax_1,
					fax_2: subway.fax_2,
					email_1: subway.email_1,
					email_2: subway.email_2,
					website: subway.website,
					open_hours: subway.open_hours,
					latitude: subway.latitude,
					longitude: subway.longitude,
					facebook: subway.facebook,
					twitter: subway.twitter,
					instagram: subway.instagram,
					pinterest: subway.pinterest,
					youtube: subway.youtube,
					is_open: true,
				},
			});
		} catch (error) {
			console.error('Failed to insert store:');
			console.error(error);
		}
	}

	// After creation update the geo_coords with the geometry point calculated from the latitude and longitude.
	await prisma.$executeRaw`UPDATE "Store" SET geo_coords = ST_SetSRID(ST_MakePoint(longitude::double precision, latitude::double precision)::geometry, 4326);`;
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
