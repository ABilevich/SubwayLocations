import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresRepository } from './stores.repository';
import { DeepMockProxy } from 'jest-mock-extended';

describe('StoresService', () => {
	let service: StoresService;
	let repository: DeepMockProxy<StoresRepository>;

	const storeMockResponse = {
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
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				StoresService,
				{
					provide: StoresRepository,
					useValue: {
						getStores: jest.fn(),
						findClosestStoreToLocation: jest.fn(),
						updateStore: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<StoresService>(StoresService);
		repository = module.get(StoresRepository);
	});

	describe('getStores', () => {
		it('should return an array of stores', async () => {
			const params = {
				page: 1,
				perPage: 10,
				onlyOpened: true,
			};

			repository.getStores.mockResolvedValue([storeMockResponse]);

			const result = await service.getStores(params);

			expect(result).toEqual([storeMockResponse]);
			expect(repository.getStores).toHaveBeenCalledWith({
				skip: params.page * params.perPage,
				take: params.perPage,
				orderBy: { id: 'asc' },
				where: { is_open: true },
			});
		});

		it('should throw a BadRequestException if invalid pagination params are provided', async () => {
			const params = {
				page: -1,
				perPage: 0,
				onlyOpened: true,
			};

			await expect(service.getStores(params)).rejects.toThrow(
				new BadRequestException(
					'Pagination params must be provided and valid (page > 0, perPage > 1).',
				),
			);
		});
	});

	describe('getStoreById', () => {
		it('should return a single store that matches the given ID', async () => {
			const id = storeMockResponse.id;
			repository.getStores.mockResolvedValue([storeMockResponse]);

			const result = await service.getStoreById({ id });

			expect(result).toEqual(storeMockResponse);
			expect(repository.getStores).toHaveBeenCalledWith({
				where: { id },
			});
		});

		it('should throw a NotFoundException if no store with the given ID is found', async () => {
			const id = 1;
			repository.getStores.mockResolvedValue([]);

			await expect(service.getStoreById({ id })).rejects.toThrow(
				new NotFoundException(`Store with id ${id} not found.`),
			);
		});

		it('should throw a BadRequestException if an invalid id is given', async () => {
			const id = -1;

			await expect(service.getStoreById({ id })).rejects.toThrow(
				new BadRequestException(`Store id must be a positive number.`),
			);
		});
	});

	describe('findClosestStoreToLocation', () => {
		it('should return the closest store to the provided location', async () => {
			const lat = -14.48136;
			const lon = 47.26045;
			repository.findClosestStoreToLocation.mockResolvedValue(
				storeMockResponse,
			);

			const result = await service.findClosestStoreToLocation({
				lat,
				lon,
			});

			expect(repository.findClosestStoreToLocation).toHaveBeenCalledWith({
				lat,
				lon,
			});
			expect(result).toEqual(storeMockResponse);
		});
	});

	describe('closeStoreById', () => {
		it('should update and return the closed store', async () => {
			const id = storeMockResponse.id;
			repository.updateStore.mockResolvedValue({
				...storeMockResponse,
				is_open: false,
			});

			const result = await service.closeStoreById({ id });

			expect(repository.updateStore).toHaveBeenCalledWith({
				where: { id },
				data: { is_open: false },
			});
			expect(result).toEqual({ ...storeMockResponse, is_open: false });
		});

		it('should throw BadRequestException when id is invalid', async () => {
			await expect(service.closeStoreById({ id: -1 })).rejects.toThrow(
				BadRequestException,
			);
		});
	});
});
