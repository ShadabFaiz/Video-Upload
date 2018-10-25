import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from 'typeorm';
import { AuditedModel } from '../AuditedModel';
import { User } from './User';

@Entity()
export class UserProfile  extends AuditedModel{

    @PrimaryGeneratedColumn()
    userProfileId: number;

    @Column({type: "varchar", length: "80"})
    firstName: string;

    @Column({type:"varchar", length:"80", default:""})
    middleName: string;

    @Column({type: "varchar", length:"80", default:""})
    lastName: string;

    @Column({type:"varchar", length:"100", default:""})
    addressLine1: string;

    @Column({type:"varchar", length:"100", default:""})
    addressLine2: string;

    @Column({type:"varchar", length:"100", default:""})
    addressLine3: string;

    @Column({type:"varchar", length:"16", default:""})
    zipCode: string;
    
    @Column({type:"varchar", length:"80", default:""})
    city: string;

    @Column({type:"varchar", length:"80", default:""})
    country: string;

    @Column({type:"varchar", length:"15", default:""})
    homeTelephone: string;

    @Column({type:"varchar", length:"15", default:""})
    mobile: string;

    @Column({type:"int", default:0})
    dayOfBirth: number;

    @Column({type:"int", default:0})
    monthOfBirth: number;

    @Column({type:"int", default:0})
    yearOfBirth: number;

}