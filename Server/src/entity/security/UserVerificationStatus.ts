import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity('user_verification_status')
export class UserVerificationStatus {
  @PrimaryGeneratedColumn()
  userverificationId: number;

  @Column({ type: 'varchar', length: '300' })
  userHash: string;

  @Column({ type: 'varchar', default: 'false' })
  active: string;

  @ManyToOne(type => User, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
