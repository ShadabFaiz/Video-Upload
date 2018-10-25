import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { AuditedModel } from '../AuditedModel';
import { Option } from './Option';

@Entity("OptionType")
export class OptionType{ 

    @PrimaryGeneratedColumn()
    optionTypeId: number;

    @Column({type: "varchar", length: "100"})
    optionType: String;

    @OneToMany(type => Option​​, option => option.optionType, {eager: true})
    options: Option[];
}