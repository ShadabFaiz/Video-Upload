import { Entity, Column, OneToMany, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Career } from './Career';
@Entity()
export class CareerPersonalityMap {
    @PrimaryColumn({type:"int"})
    careerPersId: number;

    @Column({type:"varchar", length:80})
    careerPersType: string;

    @Column({type:"varchar", length:80})
    careerPersRating: string;

    @ManyToOne(type => Career)
    @JoinColumn()
    career: Career;

}