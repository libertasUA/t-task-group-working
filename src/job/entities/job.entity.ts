import { Employer } from 'src/employer/entities/employer.entity';
import { Worker } from 'src/worker/entities/worker.entity';
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

export enum JobStatuses {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  ARCHIVE = 'ARCHIVE',
}

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  status?: JobStatuses;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  salary: number;

  @Column({ nullable: false })
  employer_id: number;

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

  @OneToMany(() => Worker, (worker) => worker.job)
  workers: Relation<Worker[]>;
}
