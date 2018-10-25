import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AuditedModel } from '../AuditedModel';
import { UserTestEvaluation } from '../evaluation/UserTestEvaluation';

export enum ReportStatus {
  NOTSTARTED,
  INPROCESS,
  GENERATED
}

@Entity('TestReport')
export class TestReport extends AuditedModel {
  @PrimaryGeneratedColumn()
  reportId: number;

  @OneToOne(type => UserTestEvaluation, { cascade: true })
  @JoinColumn()
  evaluation: UserTestEvaluation;

  @Column({ type: 'simple-json', nullable: true })
  reportDetails: {};

  @Column({
    type: 'varchar',
    length: 20,
    default: ReportStatus.NOTSTARTED,
    nullable: false
  })
  status: ReportStatus;
}
