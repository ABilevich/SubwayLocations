import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { StoresRepository } from './Stores.repository';
import { Store } from './stores.model';

// Interfaces for the parameter types of each function.
interface GetStoresParams {
	page: number; // Page number (page >= 0)
	perPage: number; // Elements per page (perPage > 0)
	onlyOpened: boolean; //Boolean to only ask for opened stores
}

interface GetStoreByIdParams {
	id: number; // Id of the store
}

interface FindClosestStoreToLocationParams {
	lat: number; // Latitude value of the location
	lon: number; // Longitude value of the location
}

interface UpdateStoreByIdParams {
	id: number; // Id of the store
	data: Store; // Id of the store
}

@Injectable()
export class StoresService {
	// This service uses the StoresRepository to delegate any interactions with the database.
	constructor(private repository: StoresRepository) {}

	// ------------------------  GET STORES -----------------------------

	// Returns an array of Stores paginated
	async getStores(params: GetStoresParams) {
		const { page, perPage, onlyOpened } = params;

		if (page == null || page < 0 || perPage == null || perPage <= 0) {
			throw new BadRequestException(
				'Pagination params must be provided and valid (page > 0, perPage > 1).',
			);
		}

		// If the onlyOpened parameter is true, then add the filter to the where object.
		const where = {
			...(onlyOpened && { is_open: true }), //if onlyOpened add requirement to filter by is_open = true
		};

		// Get data from repository
		const stores = await this.repository.getStores({
			skip: page * perPage,
			take: perPage,
			orderBy: {
				id: 'asc',
			},
			where,
		});

		return stores;
	}

	// --------------------------  GET STORE -------------------------------

	// Returns a single store that matches the given ID
	async getStoreById(params: GetStoreByIdParams) {
		const { id } = params;

		if (id == null || id <= 0) {
			throw new BadRequestException(
				'Store id must be a positive number.',
			);
		}

		// Get data from repository
		const stores = await this.repository.getStores({
			where: {
				id,
			},
		});

		if (!stores.length) {
			throw new NotFoundException(`Store with id ${id} not found.`);
		}

		return stores[0];
	}

	// -------------- FIND CLOSEST STORE TO LOCATION -----------------------

	// Given the lat and lon values, returns the closest store to the location
	async findClosestStoreToLocation(params: FindClosestStoreToLocationParams) {
		const { lat, lon } = params;

		if (!lat || !lon) {
			throw new BadRequestException(
				'Latitude and longitude must be provided.',
			);
		}

		// Get data from repository
		const store = await this.repository.findClosestStoreToLocation({
			lat,
			lon,
		});

		return store;
	}

	// -------------------- OPEN AND CLOSE STORE --------------------------

	// The close and open store methods where separated to follow SRP in case further logic needs to be added (Eg: Sending an email notification or check permissions)
	// I understand the same functionality could be achieved with only one method.
	// Additionally the parameter interface is reused.

	// Closes the given store by id
	async closeStoreById(params: GetStoreByIdParams) {
		const { id } = params;

		if (id == null || id <= 0) {
			throw new BadRequestException(
				'Store id must be a positive number.',
			);
		}

		try {
			const store = await this.repository.updateStore({
				where: {
					id,
				},
				data: {
					is_open: false,
				},
			});

			return store;
		} catch (err) {
			console.error(err);
			if (err.code == 'P2025') {
				// If record was not found
				throw new NotFoundException(`Store with id ${id} not found.`);
			} else {
				throw new InternalServerErrorException(
					'An unexpected error occurred',
				);
			}
		}
	}

	// Opens the given store by id
	async openStoreById(params: GetStoreByIdParams) {
		const { id } = params;

		if (id == null || id <= 0) {
			throw new BadRequestException(
				'Store id must be a positive number.',
			);
		}

		try {
			const store = await this.repository.updateStore({
				where: {
					id,
				},
				data: {
					is_open: true,
				},
			});

			return store;
		} catch (err) {
			console.error(err);
			if (err.code == 'P2025') {
				// If record was not found
				throw new NotFoundException(`Store with id ${id} not found.`);
			} else {
				throw new InternalServerErrorException(
					'An unexpected error occurred',
				);
			}
		}
	}
}
