import {Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

export abstract class AuditedModel{

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

}