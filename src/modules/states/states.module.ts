import { Module } from '@nestjs/common';
import { StatesRepository } from './states.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { StatesService } from './states.service';

@Module({
	imports: [PrismaModule],
	providers: [StatesRepository, StatesService],
	exports: [StatesService],
})
export class StatesModule {}
