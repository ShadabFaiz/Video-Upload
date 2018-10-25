import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AuditedModel } from '../AuditedModel';
import { User } from '../security/User';
import { MMCTest } from '../test/Test';

export enum EvaluationStatus {
	STARTED,
	COMPLETED
}

@Entity()
export class UserTestEvaluation extends AuditedModel {
	@PrimaryGeneratedColumn()
	evaluationId: number;

	@ManyToOne(type => User)
	@JoinColumn()
	user: User;

	@ManyToOne(type => MMCTest, { eager: true, cascade: true })
	@JoinColumn()
	test: MMCTest;

	@Column()
	status: EvaluationStatus;

	@Column({ type: 'simple-json', default: null, nullable: true })
	testTakerProfile: string[];

	@Column({ type: 'simple-array', default: null, nullable: true })
	ParentProfile: string[];
}
