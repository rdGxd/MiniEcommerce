import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderEntity1757938646848 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'PENDING', "total" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c0e5fdd6e2c3f3c4e2e1" PRIMARY KEY ("id"))`);
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
