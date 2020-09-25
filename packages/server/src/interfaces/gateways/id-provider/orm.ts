import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'idprovider' })
export class IdProviderOrm {
  @PrimaryColumn('bigint')
  id = '0';

  @Column('varchar', { length: 128 })
  token = '';

  @Column('varchar', { length: 128 })
  tokenSecret = '';

  @UpdateDateColumn()
  updatedAt?: string;
}
