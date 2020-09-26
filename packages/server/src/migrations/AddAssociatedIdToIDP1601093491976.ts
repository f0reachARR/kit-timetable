import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAssociatedIdToIDP1601093491976 implements MigrationInterface {
  name = 'AddAssociatedIdToIDP1601093491976';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `idprovider_twitter` ADD `associatedId` varchar(64) NULL AFTER `tokenSecret`',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `idprovider_twitter` DROP COLUMN `associatedId`',
    );
  }
}
