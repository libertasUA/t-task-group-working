import { Module } from '@nestjs/common';
import { ConfigsModule } from './config/config.module';
import { EmployerModule } from './employer/employer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceModule } from './database/dataSource.module';
import { ConfigsService } from './config/config.service';
import { JobModule } from './job/job.module';
import { WorkerModule } from './worker/worker.module';

@Module({
  imports: [
    ConfigsModule,
    DataSourceModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigsService],
      imports: [ConfigsModule],
      useFactory: async (configsService: ConfigsService) => {
        const dataSourceConfig = configsService.databaseConfig;
        return {
          type: 'postgres',
          ...dataSourceConfig,
        };
      },
    }),
    EmployerModule,
    JobModule,
    WorkerModule,
  ],
})
export class AppModule {}
