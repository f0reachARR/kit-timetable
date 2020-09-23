import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'account' })
export class AccountOrm {
  @PrimaryGeneratedColumn('uuid')
  id = '';

  @Column('bool')
  verified = false;
}
