import { Entity, Column, OneToMany, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Career } from './Career';
@Entity()
export class CareerAptitudeMap {
    @PrimaryColumn({type:"int"})
    careerAptId: number;

    @Column({type:"varchar", length:80})
    careerAptType: string;

    @Column({type:"varchar", length:80})
    careerAptRating: string;

    @ManyToOne(type => Career)
    @JoinColumn()
    career: Career;

}