import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountTable1600863588211 implements MigrationInterface {
  name = 'CreateAccountTable1600863588211';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `account` (`id` varchar(36) NOT NULL, `verified` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `account`');
  }
}
