import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Question } from './Question';
import { ProductType } from '../assessment/ProductType';

@Entity()
export class MMCTest {
    @PrimaryColumn("int")
    testId: number;

    @PrimaryColumn("int")
    langId: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({type:"varchar",length:50})
    title: String;

    @Column({type:"varchar",length:100})
    slug: String;

    @Column({type:"varchar",length:1200})
    description: String;

    @OneToMany(type => Question, question => question.test)
    questions: Question[];

    @ManyToOne(type => ProductType, productType => productType.tests, {cascade: true, onDelete: "SET NULL", onUpdate: "CASCADE"})
    productType: ProductType;

}