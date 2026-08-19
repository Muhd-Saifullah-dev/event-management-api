import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVenue1787141245156 implements MigrationInterface {
  name = 'AddVenue1787141245156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`venues\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`capacity\` int NOT NULL, \`description\` varchar(255) NULL, \`imageUrl\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`organizerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`venues\` ADD CONSTRAINT \`FK_45ba0669383d0c31aa51e08a747\` FOREIGN KEY (\`organizerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`venues\` DROP FOREIGN KEY \`FK_45ba0669383d0c31aa51e08a747\``,
    );
    await queryRunner.query(`DROP TABLE \`venues\``);
  }
}
