import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Worker } from './entities/worker.entity'; // Name of the entity
import { CreateWorkerDto } from './dto/createWorker.dto';
import { UpdateWorkerDto } from './dto/updateWorker.dto';
import { Job, JobStatuses } from 'src/job/entities/job.entity';
import { ChangeEmployerDto, OperationType } from './dto/changeEmployer.dto';
import {
  WorkerJobHistory,
  WorkerJobHistoryOperationType,
} from './entities/workerJobHistory.entity';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(WorkerJobHistory)
    private readonly workerJobHistoryRepository: Repository<WorkerJobHistory>,
  ) {}

  // Create a new worker
  async create(createWorkerDto: CreateWorkerDto): Promise<Worker> {
    const worker = this.workerRepository.create(createWorkerDto);
    return this.workerRepository.save(worker);
  }

  // Retrieve a list of all workers
  async findAll(): Promise<Worker[]> {
    return this.workerRepository.find();
  }

  // Retrieve information about a specific worker by ID
  async findOne(id: number): Promise<Worker> {
    const worker = await this.workerRepository.findOneBy({ id });
    if (!worker) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }
    return worker;
  }

  // Update information about a worker
  async update(id: number, updateWorkerDto: UpdateWorkerDto): Promise<Worker> {
    const worker = await this.findOne(id); // Check if the worker exists
    Object.assign(worker, updateWorkerDto); // Update fields
    return this.workerRepository.save(worker);
  }

  // Remove a worker
  async remove(id: number): Promise<void> {
    const result = await this.workerRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }
  }

  // Retrieve active jobs that match the worker's expected salary
  async getMatchedJobs(id: number): Promise<Job[]> {
    const worker = await this.findOne(id); // Check if the worker exists

    // Assuming 'expectedSalary' is a field on the Worker entity
    const expectedSalary = worker.salary;

    // Find jobs with a salary not lower than the worker's expected salary
    const matchedJobs = await this.jobRepository.find({
      where: {
        salary: MoreThanOrEqual(expectedSalary),
        status: JobStatuses.ACTIVE, // Assuming jobs have a status field
      },
    });

    return matchedJobs;
  }

  // Change employer or terminate worker
  async changeEmployer(
    id: number,
    changeEmployerDto: ChangeEmployerDto,
  ): Promise<Worker> {
    const worker = await this.findOne(id); // Check if the worker exists

    // For both change and terminate operations we save the fired history
    await this.workerJobHistoryRepository.save({
      operation_type: WorkerJobHistoryOperationType.FIRED,
      worker_id: worker.id,
      job_id: worker.job_id,
    });

    if (changeEmployerDto.operation_type === OperationType.CHANGE) {
      if (!changeEmployerDto.employer_id || !changeEmployerDto.job_id) {
        throw new BadRequestException(
          'If changing employer, both employer_id and job_id must be provided',
        );
      }

      // Logic for changing the employer
      worker.employer_id = changeEmployerDto.employer_id; // Assuming there is an employerId field
      worker.job_id = changeEmployerDto.job_id; // Assuming there is a jobId field

      // Save the hired history
      await this.workerJobHistoryRepository.save({
        operation_type: WorkerJobHistoryOperationType.HIRED,
        worker_id: worker.id,
        job_id: changeEmployerDto.job_id,
      });
    } else if (changeEmployerDto.operation_type === OperationType.TERMINATE) {
      // Logic for terminating employment
      worker.employer_id = null; // Assuming null indicates no employer
      worker.job_id = null; // Assuming null indicates no active job
    }

    return this.workerRepository.save(worker);
  }
}
