import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AuditedModel } from '../AuditedModel';
import { Payment } from '../order/Payment';
import { ProductCategoryCoupon } from '../payment/ProductCategoryCoupon';

@Entity('coupon')
export class Coupon extends AuditedModel {
	@PrimaryGeneratedColumn()
	couponId: number;

	@Column({ type: 'varchar', length: '30', unique: true })
	couponCode: string;

	@Column({ type: 'varchar', default: 'false' })
	active: string;

	@Column({ default: 0 })
	couponPrice: number;

	@Column()
	expires: Date;

	@OneToMany(type => ProductCategoryCoupon, productCategories => productCategories.coupon, {
		eager: true
	})
	productCategories: ProductCategoryCoupon[];

	@ManyToMany(type => Payment, { eager: true, cascade: true })
	@JoinTable()
	payments: Payment[];
}
