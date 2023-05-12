import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse';

const prisma = new PrismaClient();

type State = {
	State: string;
	Abbreviation: string;
};

type Store = {
	state: string;
	street_address: string;
	city: string;
	country: string;
	latitude: string;
	longitude: string;
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
	const csvStates = await parseCSV<State>('./data/states.csv');

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

	const csvStores = await parseCSV<Store>('./data/subway_short.csv');

	for (const subway of csvStores) {
		console.log(subway.street_address);
		try {
			const newStore = await prisma.store.upsert({
				where: {
					street_address: subway.street_address,
				},
				update: {},
				create: {
					state: {
						connect: {
							abbreviation: subway.state,
						},
					},
					street_address: subway.street_address,
					city: subway.city,
					country: subway.country,
					latitude: subway.latitude,
					longitude: subway.longitude,
					is_open: true,
				},
			});
		} catch (error) {
			console.error('Failed to insert store:');
			console.error(error);
		}

		// const geomFromText = `POINT(${subway.longitude} ${subway.latitude})`;
		// await prisma.$executeRaw`UPDATE "Store" SET coords = ST_GeomFromText(${geomFromText}) WHERE id = ${newStore.id}`;
	}

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
