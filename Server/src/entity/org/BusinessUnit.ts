import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BusinessUnitType } from './BusinessUnitType';

@Entity()
export class BusinessUnit {
  @PrimaryGeneratedColumn()
  unitId: number;

  @Column({ type: 'varchar', length: '80' })
  unitName: string;

  @ManyToOne(type => BusinessUnit, businessUnit => businessUnit.childUnits)
  parentUnit: BusinessUnit;

  @OneToMany(type => BusinessUnit, businessUnit => businessUnit.parentUnit)
  childUnits: BusinessUnit[];

  @OneToOne(type => BusinessUnitType)
  @JoinColumn()
  unitType: BusinessUnitType;
}
