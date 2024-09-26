import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CreateJobDto } from './dto/createJob.dto';
import { UpdateJobDto } from './dto/updateJob.dto';
import { JobService } from './job.service';
import { GetJobByDatePeriodDto } from './dto/getJobByDatePeriod.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // Create a new job
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  // Retrieve a list of all jobs
  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  // Retrieve all jobs for a specific date period
  @Get('date-period')
  findByDatePeriod(@Query() query: GetJobByDatePeriodDto) {
    const { startDate, endDate } = query;
    return this.jobService.findByDatePeriod(startDate, endDate);
  }

  // Retrieve information about a specific job by ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.jobService.findOne(id);
  }

  // Update information about a job
  @Put(':id')
  update(@Param('id') id: number, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(id, updateJobDto);
  }

  // Remove a job by ID
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.jobService.remove(id);
  }

  // Archive a job by ID
  @Put(':id/archive')
  archive(@Param('id') id: number) {
    return this.jobService.archive(id);
  }
}
