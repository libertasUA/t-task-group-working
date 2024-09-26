import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateWorkerDto {
  // Ensures the name field is not empty and is a string
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Ensures the salary field is a number and at least 0 (non-negative)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly salary: number;
}
