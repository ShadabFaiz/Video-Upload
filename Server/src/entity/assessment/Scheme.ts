import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { AuditedModel } from '../AuditedModel';
import { ProductPrice } from './ProductPrice';



@Entity()
export class Scheme extends AuditedModel{
    @PrimaryGeneratedColumn()
    schemeId: number;

    @Column("text")
    schemeType: String;

    @Column("int")
    schemeDeomination: number;

    @Column("double")
    schemeAmount: number;

    @ManyToOne( type => ProductPrice, productPrice => productPrice.schemes)
    productPrice: ProductPrice;

}