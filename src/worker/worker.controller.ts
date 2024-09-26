import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateWorkerDto } from './dto/createWorker.dto';
import { UpdateWorkerDto } from './dto/updateWorker.dto';
import { WorkerService } from './worker.service';

@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  // Create a new worker
  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  // Retrieve a list of all workers
  @Get()
  findAll() {
    return this.workerService.findAll();
  }

  // Retrieve active jobs that match the worker's expected salary
  @Get(':id/matched-jobs')
  getMatchedJobs(@Param('id') id: number) {
    return this.workerService.getMatchedJobs(id);
  }

  // Retrieve information about a specific worker by ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.workerService.findOne(id);
  }

  // Update information about a worker
  @Put(':id')
  update(@Param('id') id: number, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workerService.update(id, updateWorkerDto);
  }

  // Remove a worker
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.workerService.remove(id);
  }
}
