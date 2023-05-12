import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { State } from 'src/modules/states/states.model';
import { StatesService } from 'src/modules/states/states.service';
import { StoresService } from 'src/modules/stores/Stores.service';
import { Store } from 'src/modules/stores/stores.model';

@Resolver()
export class ApiResolver {
	constructor(
		private readonly statesService: StatesService,
		private readonly storesService: StoresService,
	) {}

	@Query(() => [State])
	async getStates() {
		return this.statesService.getStates();
	}

	@Query(() => [Store])
	async getStores(
		@Args('page', { type: () => Int }) page: number,
		@Args('perPage', { type: () => Int }) perPage: number,
		@Args('onlyOpened', { type: () => Boolean, defaultValue: false })
		onlyOpened: boolean,
	) {
		return this.storesService.getStores({ page, perPage, onlyOpened });
	}

	@Query(() => [Store])
	async getOpenStores(
		@Args('page', { type: () => Int }) page: number,
		@Args('perPage', { type: () => Int }) perPage: number,
	) {
		return this.storesService.getStores({
			page,
			perPage,
			onlyOpened: true,
		});
	}

	@Query(() => Store)
	async getStoreById(@Args('id', { type: () => Int }) id: number) {
		return this.storesService.getStoreById({ id });
	}

	@Query(() => Store)
	async findClosestStoreToLocation(
		@Args('lat') lat: string,
		@Args('lon') lon: string,
	) {
		return this.storesService.findClosestStoreToLocation({ lat, lon });
	}

	@Mutation(() => Store)
	async closeStoreById(@Args('id', { type: () => Int }) id: number) {
		return this.storesService.closeStoreById({ id });
	}

	@Mutation(() => Store)
	async openStoreById(@Args('id', { type: () => Int }) id: number) {
		return this.storesService.openStoreById({ id });
	}
}
