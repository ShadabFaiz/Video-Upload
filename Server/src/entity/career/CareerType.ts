import { Entity, Column, OneToMany, ManyToOne, PrimaryColumn } from 'typeorm';
@Entity()
export class CareerType {
    @PrimaryColumn({type:"int"})
    careerTypeId: number;

    @Column({type:"varchar", length:80})
    careerTypeName: string;
}