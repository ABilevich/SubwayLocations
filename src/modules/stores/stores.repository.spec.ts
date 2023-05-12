import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { StoresRepository } from './stores.repository';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe(`StoresRepository`, () => {
	let storesRepository: StoresRepository;
	let prismaService: DeepMockProxy<PrismaClient>;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [StoresRepository, PrismaService],
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaClient>())
			.compile();

		storesRepository = moduleRef.get(StoresRepository);
		prismaService = moduleRef.get(PrismaService);
	});

	describe(`getStores`, () => {
		it(`should get a Store that matches filters`, async () => {
			// Arrange
			const mockedStores = [
				{
					id: 1,
					name: 'Fake Store',
					street_address: 'Fake Address 1558',
					city: 'Fake City',
					state_id: 1,
					zip_code: '',
					country: 'Fake Country',
					phone_number_1: '',
					phone_number_2: '',
					fax_1: '',
					fax_2: '',
					email_1: '',
					email_2: '',
					website: '',
					open_hours: '',
					latitude: '-14.48136',
					longitude: '47.26045',
					facebook: '',
					twitter: '',
					instagram: '',
					pinterest: '',
					youtube: '',
					is_open: true,
				},
			];
			prismaService.store.findMany.mockResolvedValue(mockedStores);

			// Act
			const getStores = () =>
				storesRepository.getStores({
					where: {
						id: 1,
					},
				});

			console.log(getStores);

			// Assert
			await expect(getStores()).resolves.toBe(mockedStores);
		});
		// it(`should not be over 80 characters`, async () => {
		// 	// Arrange
		// 	const payload = {
		// 		name: `New Store`,
		// 		abbreviation: 'NEW',
		// 	};

		// 	// Act
		// 	const createStore = () =>
		// 		storesRepository.createStore({
		// 			data: {
		// 				name: payload.name,
		// 				abbreviation: payload.abbreviation,
		// 			},
		// 		});

		// 	// Assert
		// 	await expect(createStore()).rejects.toBeInstanceOf(Error);
		// });
	});
});
