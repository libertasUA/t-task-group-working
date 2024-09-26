import { Job } from 'src/job/entities/job.entity';
import { Worker } from 'src/worker/entities/worker.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';

@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  status?: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Job, (job) => job.employer)
  jobs: Relation<Job[]>;

  @OneToMany(() => Worker, (worker) => worker.employer)
  workers: Relation<Worker[]>;
}
