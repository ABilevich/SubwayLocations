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

	describe(`getStates`, () => {
		it(`should return a State array`, async () => {
			// Arrange
			const mockedState = [
				{
					id: 1,
					name: 'Random State',
					abbreviation: 'RS',
				},
			];
			prismaService.state.findMany.mockResolvedValue(mockedState);

			// Act
			const createState = () => statesRepository.getStates({});

			// Assert
			await expect(createState()).resolves.toBe(mockedState);
		});
	});
});
