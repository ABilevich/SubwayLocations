import { Injectable } from '@nestjs/common';
import { Prisma, State } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class StatesRepository {
	constructor(private prisma: PrismaService) {}

	async getStates(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.StateWhereUniqueInput;
		where?: Prisma.StateWhereInput;
		orderBy?: Prisma.StateOrderByWithRelationInput;
	}): Promise<State[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.state.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}
}
