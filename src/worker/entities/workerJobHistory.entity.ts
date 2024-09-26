import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Worker } from './worker.entity';

import type { Relation } from 'typeorm';

export enum WorkerJobHistoryOperationType {
  HIRED = 'HIRED',
  FIRED = 'FIRED',
}

@Entity()
export class WorkerJobHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  worker_id: number;

  @Column({ nullable: false })
  operation_type: WorkerJobHistoryOperationType;

  @Column({ nullable: false })
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

  @ManyToOne(() => Worker, (worker) => worker.job_history)
  @JoinColumn({
    name: 'worker_id',
    referencedColumnName: 'id',
  })
  worker: Relation<Worker>;
}
