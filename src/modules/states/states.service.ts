import { Injectable } from '@nestjs/common';
import { StatesRepository } from './states.repository';
import { State } from '@prisma/client';

@Injectable()
export class StatesService {
	constructor(private repository: StatesRepository) {}

	async getStates() {
		const States = await this.repository.getStates({});
		return States;
	}
}
