import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateEmployerDto } from './dto/createEmployer.dto';
import { UpdateEmployerDto } from './dto/updateEmployer.dto';
import { EmployerService } from './employer.service';

@Controller('employers')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  // Create a new employer
  @Post()
  create(@Body() createEmployerDto: CreateEmployerDto) {
    return this.employerService.create(createEmployerDto);
  }

  // Retrieve a list of all employers
  @Get()
  findAll() {
    return this.employerService.findAll();
  }

  // Retrieve information about a specific employer by id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employerService.findOne(id);
  }

  // Update information about an employer
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateEmployerDto: UpdateEmployerDto,
  ) {
    return this.employerService.update(id, updateEmployerDto);
  }

  // Delete an employer
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.employerService.remove(id);
  }

  // Retrieve a list of all workers for a specific employer
  @Get(':id/workers')
  findAllWorkers(@Param('id') id: number) {
    return this.employerService.findAllWorkers(id);
  }
}
