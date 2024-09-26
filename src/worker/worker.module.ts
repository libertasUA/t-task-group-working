import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Worker } from './entities/worker.entity';
import { Job } from 'src/job/entities/job.entity';
import { ConfigsModule } from 'src/config/config.module';
import { WorkerJobHistory } from './entities/workerJobHistory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Worker, Job, WorkerJobHistory]),
    ConfigsModule,
  ],
  providers: [WorkerService],
  controllers: [WorkerController],
})
export class WorkerModule {}
