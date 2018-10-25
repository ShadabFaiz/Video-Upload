import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn, PrimaryColumn, Generated} from "typeorm";
import { AuditedModel } from "../AuditedModel";
import { MMCTest } from "./Test";
import { OptionType } from './OptionType';

@Entity("Question")
export class Question extends AuditedModel{

    @PrimaryColumn("int")
    questionId: number;

    @PrimaryColumn( )
    langId: number;

    @Column({type: "varchar", length: 500})
    question: String;

    @ManyToOne(type => MMCTest, test => test.questions, {primary: true, cascade: true, onDelete: "CASCADE", onUpdate:"CASCADE"})
    @JoinColumn()
    test: MMCTest;

    @Column({type: "varchar", length: 20, default: null})
    type: string;

    @ManyToOne(type => OptionType, {eager: true, nullable: true, cascade: true, onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn()
    optionType: OptionType;
}