import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Store as StoreDB } from '@prisma/client';
import { State } from '../states/states.model';

@ObjectType()
export class Store {
	@Field(() => Int)
	id: StoreDB[`id`];

	@Field(() => String)
	street_address: StoreDB[`street_address`];

	@Field(() => Number)
	state_id: StoreDB[`state_id`];

	@Field(() => State)
	state: State;

	@Field(() => String)
	city: StoreDB[`city`];

	@Field(() => String)
	country: StoreDB[`country`];

	@Field(() => String)
	latitude: StoreDB[`latitude`];

	@Field(() => String)
	longitude: StoreDB[`longitude`];

	@Field(() => Boolean)
	is_open: StoreDB[`is_open`];

	// @Field(() => Boolean)
	// geo_coords: StoreDB[`geo_coords`];
}
