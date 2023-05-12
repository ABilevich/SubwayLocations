import { Injectable } from '@nestjs/common';
import { StoresRepository } from './Stores.repository';

@Injectable()
export class StoresService {
	constructor(private repository: StoresRepository) {}

	async getStores() {
		const Stores = await this.repository.getStores({
			orderBy: {
				id: 'asc',
			},
		});
		return Stores;
	}

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

	async getStoreById(params: { id: number }) {
		const { id } = params; //TODO: Add check id = null
		const Stores = await this.repository.getStores({
			where: {
				id,
			},
		});
		return Stores[0]; //TODO: Add check Stores.length = 0
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
