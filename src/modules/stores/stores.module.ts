import { Module } from '@nestjs/common';
import { StoresRepository } from './Stores.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { StoresService } from './Stores.service';

@Module({
	imports: [PrismaModule],
	providers: [StoresRepository, StoresService],
	exports: [StoresService],
})
export class StoresModule {}
