import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AuditedModel } from '../AuditedModel';
import { MMCTest } from '../test/Test';

@Entity()
export class ReportInterpretation extends AuditedModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 30 })
	dimension: string;

	@ManyToOne(type => MMCTest)
	@JoinColumn()
	test: MMCTest[];

	@Column({ type: 'varchar', length: 8000 })
	interpretation: string;

	@Column({ type: 'varchar', length: 8000, default: null })
	learningMethod: string;
}
