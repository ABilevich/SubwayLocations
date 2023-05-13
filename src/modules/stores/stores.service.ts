import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { StoresRepository } from './Stores.repository';

interface GetStoresParams {
	page: number; // Page number (page >= 0)
	perPage: number; // Elements per page (perPage > 0)
	onlyOpened: boolean; //Boolean to only ask for opened stores
}

interface GetStoreByIdParams {
	id: number;
}

interface FindClosestStoreToLocationParams {
	lat: number;
	lon: number;
}

interface CloseStoreByIdParams {
	id: number;
}

interface OpenStoreByIdParams {
	id: number;
}

@Injectable()
export class StoresService {
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

		const store = await this.repository.findClosestStoreToLocation({
			lat,
			lon,
		});

		return store;
	}

	// -------------------- OPEN AND CLOSE STORE --------------------------

	// The close and open store methods where separated to follow SRP in case further logic needs to be added (Eg: Sending an email notification or check permissions)

	// Closes the given store by id
	async closeStoreById(params: CloseStoreByIdParams) {
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
			console.error(err); // Print error for debugging
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
	async openStoreById(params: OpenStoreByIdParams) {
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
			console.error(err); // Print error for debugging
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
