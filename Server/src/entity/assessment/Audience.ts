import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { AuditedModel } from '../AuditedModel';
import { ProductType } from './ProductType';
@Entity()
export class Audience extends AuditedModel{

    @PrimaryGeneratedColumn()
    audienceId: number;

    @Column({type:"varchar", length:80})
    audienceName: string;

    @Column({type:"varchar", length:100})
    audienceDetail: String;

    @ManyToOne(type=>ProductType, productType=> productType.audiences)
    productType: ProductType;

}