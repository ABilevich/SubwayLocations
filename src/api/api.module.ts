import { Module } from '@nestjs/common';
import { StatesModule } from 'src/modules/states/states.module';
import { ApiController } from './api.controller';
import { ApiResolver } from './api.resolver';
import { StoresModule } from 'src/modules/stores/stores.module';

@Module({
	imports: [StatesModule, StoresModule],
	controllers: [ApiController],
	providers: [ApiResolver],
})
export class ApiModule {}
