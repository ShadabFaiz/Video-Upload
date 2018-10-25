import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AuditedModel } from '../AuditedModel';
import { MMCTest } from '../test/Test';
import { Audience } from './Audience';
import { ProductCategory } from './ProductCategory';
import { ProductPrice } from './ProductPrice';

@Entity()
export class ProductType extends AuditedModel {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({ type: 'varchar', length: 80 })
  productName: string;

  @Column({ type: 'varchar', length: 1500 })
  productDetail: string;

  @OneToOne(type => ProductPrice, { cascade: true, eager: true })
  @JoinColumn()
  productPrice: ProductPrice;

  @Column({ type: 'varchar', length: 100 })
  deliveryMode: string;

  @ManyToOne(
    type => ProductCategory,
    productCategory => productCategory.productTypes
  )
  productCategory: ProductCategory;

  @OneToMany(type => Audience, audience => audience.productType)
  audiences: Audience[];

  @OneToMany(type => MMCTest, test => test.productType)
  tests: MMCTest[];
}
