import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AuditedModel } from '../AuditedModel';

@Entity()
export class UserCredential extends AuditedModel {
  @PrimaryGeneratedColumn()
  userCredentialId: number;

  @Column({ type: 'varchar', length: '500' })
  credential: string;
}
