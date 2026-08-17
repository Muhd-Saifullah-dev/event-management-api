import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRole1786963645723 implements MigrationInterface {
    name = 'AddUserRole1786963645723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` enum ('user', 'organizer', 'admin') NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`isVerified\` \`isVerified\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`isVerified\` \`isVerified\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    }

}
