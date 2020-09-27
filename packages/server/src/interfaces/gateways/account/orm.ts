import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'account' })
export class AccountOrm {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('bool')
  verified = false;
}
