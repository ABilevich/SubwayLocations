import { Injectable } from '@nestjs/common';
import { Prisma, State } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class StatesRepository {
	constructor(private prisma: PrismaService) {}

	async createState(params: {
		data: Prisma.StateCreateInput;
	}): Promise<State> {
		const { data } = params;
		if (data.abbreviation.length > 2) {
			throw new Error(`abbreviation too long`);
		}
		return this.prisma.state.create({ data });
	}

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

	async updateState(params: {
		where: Prisma.StateWhereUniqueInput;
		data: Prisma.StateUpdateInput;
	}): Promise<State> {
		const { where, data } = params;
		return this.prisma.state.update({ where, data });
	}

	async deleteState(params: {
		where: Prisma.StateWhereUniqueInput;
	}): Promise<State> {
		const { where } = params;
		return this.prisma.state.delete({ where });
	}
}
