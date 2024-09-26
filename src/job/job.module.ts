import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { ConfigsModule } from 'src/config/config.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), ConfigsModule],
  providers: [JobService],
  controllers: [JobController],
})
export class JobModule {}
