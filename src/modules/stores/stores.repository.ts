import { Injectable, NotFoundException } from '@nestjs/common';
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

	async findClosestStoreToLocation(params: {
		lat: number;
		lon: number;
	}): Promise<Store> {
		const { lat, lon } = params;
		const point = `POINT(${lon} ${lat})`;
		const result = await this.prisma.$queryRaw<Store[]>(
			Prisma.sql`
			SELECT 
				"id"
			FROM 
				"Store" s 
			ORDER BY 
				geo_coords <-> ST_GeomFromText (${point}, 4326) 
			LIMIT 
				1;`,
		);

		if (!result || !result[0])
			throw new NotFoundException(`No store was found.`);
		const Stores = await this.getStores({
			where: {
				id: result[0].id,
			},
		});

		return Stores[0];
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
