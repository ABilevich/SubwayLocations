import { Field, Int, ObjectType } from '@nestjs/graphql';
import { State as StateDB } from '@prisma/client';

@ObjectType()
export class State {
	@Field(() => Int)
	id: StateDB[`id`];

	@Field(() => String)
	name: StateDB[`name`];

	@Field(() => String)
	abbreviation: StateDB[`abbreviation`];
}
