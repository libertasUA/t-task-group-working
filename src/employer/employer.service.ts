import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employer } from './entities/employer.entity'; // Name of the entity
import { CreateEmployerDto } from './dto/createEmployer.dto';
import { UpdateEmployerDto } from './dto/updateEmployer.dto';
import { Worker } from 'src/worker/entities/worker.entity';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private readonly employerRepository: Repository<Employer>,
  ) {}

  // Create a new employer
  async create(createEmployerDto: CreateEmployerDto): Promise<Employer> {
    const employer = this.employerRepository.create(createEmployerDto);
    return this.employerRepository.save(employer);
  }

  // Retrieve a list of all employers
  async findAll(): Promise<Employer[]> {
    return this.employerRepository.find();
  }

  // Retrieve information about a specific employer by ID
  async findOne(id: number): Promise<Employer> {
    const employer = await this.employerRepository.findOneBy({ id });
    if (!employer) {
      throw new NotFoundException(`Employer with ID ${id} not found`);
    }
    return employer;
  }

  // Update information about an employer
  async update(
    id: number,
    updateEmployerDto: UpdateEmployerDto,
  ): Promise<Employer> {
    const employer = await this.findOne(id); // Check for existence
    Object.assign(employer, updateEmployerDto); // Update fields
    return this.employerRepository.save(employer);
  }

  // Delete an employer
  async remove(id: number): Promise<void> {
    const result = await this.employerRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employer with ID ${id} not found`);
    }
  }

  // Retrieve a list of all workers for a specific employer
  async findAllWorkers(id: number): Promise<Worker[]> {
    const employer = await this.employerRepository.findOne({
      where: { id },
      relations: { workers: true },
    });

    if (!employer) {
      throw new NotFoundException(`Employer with ID ${id} not found`);
    }

    return employer.workers;
  }
}
