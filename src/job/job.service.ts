import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Job, JobStatuses } from './entities/job.entity'; // Entity name
import { CreateJobDto } from './dto/createJob.dto';
import { UpdateJobDto } from './dto/updateJob.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  // Create a new job
  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create(createJobDto);
    return this.jobRepository.save(job);
  }

  // Retrieve a list of all jobs
  async findAll(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  // Retrieve information about a specific job by ID
  async findOne(id: number): Promise<Job> {
    const job = await this.jobRepository.findOneBy({ id });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  // Update information about a job
  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id); // Check for existence
    Object.assign(job, updateJobDto); // Update fields
    return this.jobRepository.save(job);
  }

  // Remove a job
  async remove(id: number): Promise<void> {
    const result = await this.jobRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
  }

  // Retrieve all jobs for a specific date period
  async findByDatePeriod(startDate: string, endDate: string): Promise<Job[]> {
    const jobs = await this.jobRepository.find({
      where: {
        created_at: Between(new Date(startDate), new Date(endDate)), // Condition by date range
      },
    });

    return jobs;
  }

  // Archive a job
  async archive(id: number): Promise<Job> {
    const job = await this.findOne(id); // Check for the existence of the job

    // Update status or archive time
    job.status = JobStatuses.ARCHIVE; // For example, change status
    job.updated_at = new Date(); // Update last modified date

    return this.jobRepository.save(job);
  }
}
