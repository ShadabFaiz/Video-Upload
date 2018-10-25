import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AuditedModel } from '../AuditedModel';
import { Order } from './Order';

export enum PaymentStatus {
	INITIATED,
	Successfull,
	FAILED
}

export enum PaymentType {
	COUPON = 'COUPON',
	PAYTM = 'PAYTM'
}

@Entity()
export class Payment extends AuditedModel {
	@PrimaryGeneratedColumn()
	paymentId: number;

	@Column()
	paymentType: string;

	@OneToOne(type => Order)
	@JoinColumn()
	order: Order;

	@Column()
	paymentValue: number;

	@Column()
	paymentStatus: number;

	@Column({ type: 'json', nullable: true })
	GatewayResponse: {};
}
