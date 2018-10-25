import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { AuditedModel } from '../AuditedModel';
import { User } from '../security/User';


@Entity()
export class ShoppingCart extends AuditedModel{

    @PrimaryGeneratedColumn()
    cartId: number;

    @Column({type:"text"})
    cartItems: string;


    @OneToOne(type => User, {eager:true})
    @JoinColumn()
    user: User;    

}