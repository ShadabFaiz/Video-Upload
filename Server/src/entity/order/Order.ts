import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProductType } from '../assessment/ProductType';
import { AuditedModel } from '../AuditedModel';
import { User } from '../security/User';

export enum OrderStatus {
	CHECKOUT,
	PLACED,
	FAILED,
	COMPLETED
}

@Entity()
export class Order extends AuditedModel {
	@PrimaryGeneratedColumn('uuid')
	orderId: string;

	@ManyToMany(type => ProductType, { cascade: true, eager: true })
	@JoinTable()
	productType: ProductType[];

	@ManyToOne(type => User, { eager: true, cascade: true })
	@JoinColumn()
	user: User;

	@Column('int')
	orderValue: number;

	@Column('int')
	orderStatus: number;

	@Column({ type: 'varchar', default: '' })
	checkSum: string;
}
