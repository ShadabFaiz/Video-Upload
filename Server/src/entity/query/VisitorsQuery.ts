import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AuditedModel } from '../AuditedModel';

@Entity()
export class VisitorsQuery extends AuditedModel {
  @PrimaryGeneratedColumn()
  visitorId: number;

  @Column({ type: 'varchar', length: 6 })
  salutation: string;

  @Column({ type: 'varchar', length: 30 })
  firstName: string;

  @Column({ type: 'varchar', length: 30 })
  lastName: string;

  @Column({ type: 'varchar', length: 40 })
  emailAddress: string;

  @Column({ type: 'varchar', length: 15 })
  contactNo: string;

  @Column({ type: 'varchar', length: 600 })
  query: string;
}
