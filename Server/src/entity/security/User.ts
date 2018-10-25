import { ObjectId } from 'bson';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AuditedModel } from '../AuditedModel';

@Entity('user')
export class User extends AuditedModel {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: 'varchar', length: '300' })
  userName: string;

  @Column({ type: 'varchar', length: 50 })
  credential: string;

  @Column(type => ObjectId)
  video: ObjectId[];
}
