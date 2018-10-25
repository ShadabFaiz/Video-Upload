import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { AuditedModel } from '../AuditedModel';
import { User } from '../security/User';
import { MMCTest } from '../test/Test';
import { Question } from '../test/Question';
import { UserTestEvaluation } from './UserTestEvaluation';
import { Option } from '../test/Option';

@Entity({
    orderBy: {
       question: "ASC"
    }
})
export class EvaluationResponse {

    @PrimaryGeneratedColumn()
    responseId: number;

    @ManyToOne(type=>UserTestEvaluation, {cascade: true})
    @JoinColumn({name: "evaluationId"})
    evaluation: UserTestEvaluation;

    @ManyToOne(type=>Question, {eager: true})
    @JoinColumn({referencedColumnName: "questionId"})
    question: Question;
    
    @ManyToOne(type=>Option, {eager: true})
    @JoinColumn()
    option: Option;
}