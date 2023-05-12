import { Injectable } from '@nestjs/common';
import { Prisma, Store } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class StoresRepository {
	constructor(private prisma: PrismaService) {}

	async getStores(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.StoreWhereUniqueInput;
		where?: Prisma.StoreWhereInput;
		orderBy?: Prisma.StoreOrderByWithRelationInput;
	}): Promise<Store[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.store.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			include: { state: true },
		});
	}

	async updateStore(params: {
		where: Prisma.StoreWhereUniqueInput;
		data: Prisma.StoreUpdateInput;
	}): Promise<Store> {
		const { where, data } = params;
		return this.prisma.store.update({ where, data });
	}

	async deleteStore(params: {
		where: Prisma.StoreWhereUniqueInput;
	}): Promise<Store> {
		const { where } = params;
		return this.prisma.store.delete({ where });
	}
}
