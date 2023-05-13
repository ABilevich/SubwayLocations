import { Module } from '@nestjs/common';
import { StatesModule } from 'src/modules/states/states.module';
import { ApiResolver } from './api.resolver';
import { StoresModule } from 'src/modules/stores/stores.module';

@Module({
	imports: [StatesModule, StoresModule],
	providers: [ApiResolver],
})
export class ApiModule {}
