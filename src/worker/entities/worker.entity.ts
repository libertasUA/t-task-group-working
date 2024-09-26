import { Employer } from 'src/employer/entities/employer.entity';
import { Job } from 'src/job/entities/job.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { WorkerJobHistory } from './workerJobHistory.entity';

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  salary: number;

  @Column({ nullable: true })
  employer_id: number;

  @Column({ nullable: true })
  job_id: number;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Employer, (employer) => employer.jobs)
  @JoinColumn({
    name: 'employer_id',
    referencedColumnName: 'id',
  })
  employer: Relation<Employer>;

  @ManyToOne(() => Job, (job) => job.workers)
  @JoinColumn({
    name: 'job_id',
    referencedColumnName: 'id',
  })
  job: Relation<Job>;

  @OneToMany(
    () => WorkerJobHistory,
    (workerJobHistory) => workerJobHistory.worker,
  )
  job_history: Relation<WorkerJobHistory[]>;
}
