import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Double} from "typeorm";
import { AuditedModel } from '../AuditedModel';
import { Scheme } from './Scheme';

@Entity()
export class ProductPrice extends AuditedModel{

    @PrimaryGeneratedColumn({type:"int"})
    productPriceId: number

    @OneToMany(type => Scheme, scheme => scheme.productPrice)
    schemes: Scheme[];

    @Column("double")
    price: Double;

}