import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductEntity1757847248938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "product" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" varchar NOT NULL,
        "description" text,
        "price" decimal(10, 2) NOT NULL,
        "stock" integer NOT NULL,
        "imageUrl" varchar,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "product"
    `);
  }
}
