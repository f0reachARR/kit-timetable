import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIdProviderTwitter1601022993310
  implements MigrationInterface {
  name = 'CreateIdProviderTwitter1601022993310';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `idprovider_twitter` (`id` bigint NOT NULL, `token` varchar(64) NOT NULL, `tokenSecret` varchar(64) NOT NULL, `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `idprovider_twitter`');
  }
}
