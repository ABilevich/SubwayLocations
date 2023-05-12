import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { StatesRepository } from './states.repository';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe(`StatesRepository`, () => {
	let statesRepository: StatesRepository;
	let prismaService: DeepMockProxy<PrismaClient>;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [StatesRepository, PrismaService],
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaClient>())
			.compile();

		statesRepository = moduleRef.get(StatesRepository);
		prismaService = moduleRef.get(PrismaService);
	});

	describe(`createState`, () => {
		it(`should create a new State`, async () => {
			// Arrange
			const mockedState = {
				id: 1,
				name: 'New State',
				abbreviation: 'NE',
			};
			prismaService.state.create.mockResolvedValue(mockedState);

			// Act
			const createState = () =>
				statesRepository.createState({
					data: {
						name: mockedState.name,
						abbreviation: mockedState.abbreviation,
					},
				});

			console.log(createState);

			// Assert
			await expect(createState()).resolves.toBe(mockedState);
		});
		it(`should not be over 80 characters`, async () => {
			// Arrange
			const payload = {
				name: `New State`,
				abbreviation: 'NEW',
			};

			// Act
			const createState = () =>
				statesRepository.createState({
					data: {
						name: payload.name,
						abbreviation: payload.abbreviation,
					},
				});

			// Assert
			await expect(createState()).rejects.toBeInstanceOf(Error);
		});
	});
});
