import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { AuditedModel } from '../AuditedModel';
import { MMCTest } from '../test/Test';
import { ProductPrice } from './ProductPrice';
import { Audience } from './Audience';
import { ProductType } from './ProductType';


@Entity()
export class ProductCategory extends AuditedModel{

    @PrimaryGeneratedColumn()
    productCategoryId: number;

    @Column({type:"varchar", length:80})
    productCategoryName: string;

    @Column({type:"varchar", length:1500})
    productCategoryDetail: String;

    @OneToMany(type => ProductType, productType => productType.productCategory, {cascade:true, eager:true})
    productTypes: ProductType[];    

}