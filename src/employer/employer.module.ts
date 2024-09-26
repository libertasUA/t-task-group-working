import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { ConfigsModule } from 'src/config/config.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employer]), ConfigsModule],
  providers: [EmployerService],
  controllers: [EmployerController],
})
export class EmployerModule {}
