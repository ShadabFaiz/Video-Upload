import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, PrimaryColumn, Index} from "typeorm";
import { AuditedModel } from '../AuditedModel';
import { OptionType } from './OptionType';

@Entity("Option")
export class Option{
    
    @PrimaryColumn("int")
    optionId: number;

    @PrimaryColumn("int")
    langId: number;

    @Column({type: "varchar", length: 500})
    optionDetail: String;

    @Column("int")
    optionValue: number;

    @ManyToOne(type => OptionType, optionType=>optionType.options)
    optionType: OptionType;
}