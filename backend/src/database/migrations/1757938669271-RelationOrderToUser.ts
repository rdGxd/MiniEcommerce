import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationOrderToUser1757938669271 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD COLUMN "userId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userId"`);
    }

}
