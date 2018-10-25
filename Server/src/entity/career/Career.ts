import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn, OneToMany } from 'typeorm';
import { CareerType } from './CareerType';
import { CareerAptitudeMap } from './CareerAptitudeMap';
import { CareerPersonalityMap } from './CareerPersonalityMap';
@Entity()
export class Career {
    @PrimaryColumn({type:"int"})
    careerId: number;

    @Column({type:"varchar", length:100})
    careerName: string;

    @Column({type:"varchar", length:2056})
    careerDescription: string;

    @ManyToOne(type=>CareerType)
    @JoinColumn()
    careerType: CareerType;

    @OneToMany(type=>CareerAptitudeMap, careerAptitudeMap=>careerAptitudeMap.career)
    careerAptitudeMaps: Promise<CareerAptitudeMap[]>;

    @OneToMany(type=>CareerPersonalityMap, careerPersonalityMap=>careerPersonalityMap.career)
    careerPersonalityMaps: Promise<CareerPersonalityMap[]>;
}