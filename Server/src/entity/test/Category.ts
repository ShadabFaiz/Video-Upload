import {Column, PrimaryGeneratedColumn, Entity} from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar", length:"100"})
    name: string;

}
