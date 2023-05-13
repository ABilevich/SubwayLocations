import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Store as StoreDB } from '@prisma/client';
import { State } from '../states/states.model';

@ObjectType()
export class Store {
	@Field(() => Int)
	id: StoreDB[`id`];

	@Field(() => String)
	name: StoreDB[`name`];

	@Field(() => String)
	street_address: StoreDB[`street_address`];

	@Field(() => String)
	city: StoreDB[`city`];

	@Field(() => State)
	state: State;

	@Field(() => Number)
	state_id: StoreDB[`state_id`];

	@Field(() => String)
	zip_code: StoreDB[`zip_code`];

	@Field(() => String)
	country: StoreDB[`country`];

	@Field(() => String)
	phone_number_1: StoreDB[`phone_number_1`];

	@Field(() => String)
	phone_number_2: StoreDB[`phone_number_2`];

	@Field(() => String)
	fax_1: StoreDB[`fax_1`];

	@Field(() => String)
	fax_2: StoreDB[`fax_2`];

	@Field(() => String)
	email_1: StoreDB[`email_1`];

	@Field(() => String)
	email_2: StoreDB[`email_2`];

	@Field(() => String)
	website: StoreDB[`website`];

	@Field(() => String)
	open_hours: StoreDB[`open_hours`];

	@Field(() => String)
	latitude: StoreDB[`latitude`];

	@Field(() => String)
	longitude: StoreDB[`longitude`];

	@Field(() => String)
	facebook: StoreDB[`facebook`];

	@Field(() => String)
	twitter: StoreDB[`twitter`];

	@Field(() => String)
	instagram: StoreDB[`instagram`];

	@Field(() => String)
	pinterest: StoreDB[`pinterest`];

	@Field(() => String)
	youtube: StoreDB[`youtube`];

	@Field(() => Boolean)
	is_open: StoreDB[`is_open`];
}
