import { Body, Controller, Get, Post } from '@nestjs/common';
import { StatesService } from 'src/modules/states/states.service';

@Controller('api')
export class ApiController {
	constructor(private readonly StatesService: StatesService) {}

	// @Post(`State`)
	// async createState(@Body() data: { name: string; abbreviation: string }) {
	// 	const { name, abbreviation } = data;
	// 	return this.StatesService.createState({
	// 		name,
	// 		abbreviation,
	// 	});
	// }

	// @Get('States')
	// getStates() {
	// 	return this.StatesService.getStates();
	// }
}
