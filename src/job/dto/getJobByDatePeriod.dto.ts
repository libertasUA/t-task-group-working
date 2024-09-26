import { IsNotEmpty, IsDateString } from 'class-validator';

export class GetJobByDatePeriodDto {
  // Ensures startDate is a valid date string and is not empty
  @IsNotEmpty()
  @IsDateString()
  readonly startDate: string;

  // Ensures endDate is a valid date string and is not empty
  @IsNotEmpty()
  @IsDateString()
  readonly endDate: string;
}
