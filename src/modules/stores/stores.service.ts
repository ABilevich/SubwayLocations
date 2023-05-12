import { Injectable } from '@nestjs/common';
import { StoresRepository } from './Stores.repository';

@Injectable()
export class StoresService {
	constructor(private repository: StoresRepository) {}

	async getStores(params: {
		page: number;
		perPage: number;
		onlyOpened: boolean;
	}) {
		const { page, perPage, onlyOpened } = params;
		const where = {
			...(onlyOpened && { is_open: true }), //if onlyOpened add requirement to filter by is_open = true
		};

		const Stores = await this.repository.getStores({
			skip: page * perPage,
			take: perPage,
			orderBy: {
				id: 'asc',
			},
			where,
		});
		return Stores;
	}

	// REMOVE?
	async getOpenStores() {
		const Stores = await this.repository.getStores({
			orderBy: {
				id: 'asc',
			},
			where: {
				is_open: true,
			},
		});
		return Stores;
	}

	// REMOVE?
	async getStoreById(params: { id: number }) {
		const { id } = params; //TODO: Add check id = null
		const Stores = await this.repository.getStores({
			where: {
				id,
			},
		});
		return Stores[0]; //TODO: Add check Stores.length = 0
	}

	async findClosestStoreToLocation(params: { lat: string; lon: string }) {
		const { lat, lon } = params; //TODO: Add check id = null
		const Store = await this.repository.findClosestStoreToLocation({
			lat,
			lon,
		});
		return Store;
	}

	async closeStoreById(params: { id: number }) {
		const { id } = params; //TODO: Add check id = null
		const Stores = await this.repository.updateStore({
			where: {
				id,
			},
			data: {
				is_open: false,
			},
		});
		return Stores;
	}

	async openStoreById(params: { id: number }) {
		const { id } = params; //TODO: Add check id = null
		const Stores = await this.repository.updateStore({
			where: {
				id,
			},
			data: {
				is_open: true,
			},
		});
		return Stores;
	}
}
