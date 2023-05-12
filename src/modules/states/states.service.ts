import { Injectable } from '@nestjs/common';
import { StatesRepository } from './states.repository';
import { State } from '@prisma/client';

@Injectable()
export class StatesService {
	constructor(private repository: StatesRepository) {}

	async createState(params: {
		name: State[`name`];
		abbreviation: State[`abbreviation`];
	}) {
		const { name, abbreviation } = params;

		// call repository layer
		const State = await this.repository.createState({
			data: {
				name,
				abbreviation,
			},
		});

		// do other things in the service layer... e.g. send email of State

		return State;
	}

	async getStates() {
		const States = await this.repository.getStates({});
		return States;
	}
}
