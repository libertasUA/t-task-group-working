import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployerDto {
  // Ensures the name field is not empty and is a string
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Ensures the status field is not empty and is a string
  @IsNotEmpty()
  @IsString()
  readonly status: string;
}
