import { IsNotEmpty, IsEnum, IsNumber, Min, IsString } from 'class-validator';
import { JobStatuses } from '../entities/job.entity';

export class CreateJobDto {
  // Ensures the name field is not empty and is a string
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Validates that the status is one of the allowed values in the JobStatuses enum
  @IsEnum(JobStatuses)
  readonly status: JobStatuses;

  // Ensures the salary is a number
  @IsNumber()
  @Min(0) // Ensures the salary is at least 0 (non-negative)
  readonly salary: number;

  // Ensures the employer_id is a number
  @IsNumber()
  readonly employer_id: number;
}
