import { Column, PrimaryGeneratedColumn, Entity, OneToOne, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable, Double } from 'typeorm';
import { AuditedModel } from '../AuditedModel';
import { ProductCategory } from '../assessment/ProductCategory';
import { Coupon } from './Coupon';


@Entity("product_category_coupon")
export class ProductCategoryCoupon extends AuditedModel{

    @PrimaryGeneratedColumn()
    prodCatCouponId: number;

    @ManyToOne(type=>ProductCategory)
    @JoinColumn()
    productCategory: ProductCategory;
    
    @ManyToOne(type=> Coupon, coupon => coupon.productCategories)
    coupon: Coupon;

}