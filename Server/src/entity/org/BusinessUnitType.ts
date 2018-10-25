import {Column, PrimaryGeneratedColumn, Entity} from "typeorm";

@Entity()
export class BusinessUnitType{

    @PrimaryGeneratedColumn()
    businessUnitTypeId: number;

    @Column({type:"varchar", length:"50"})        
    businessUnitTypeName: string;

}