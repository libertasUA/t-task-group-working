// src/worker/dto/changeEmployer.dto.ts
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum OperationType {
  CHANGE = 'CHANGE',
  TERMINATE = 'TERMINATE',
}

export class ChangeEmployerDto {
  @IsEnum(OperationType)
  @IsNotEmpty()
  operation_type: OperationType;

  @IsNumber()
  employer_id: number;

  @IsNumber()
  job_id: number;
}
