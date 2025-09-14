import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManyToManyProductCategory1757847951821
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
 CREATE TABLE "product_categories_category" (
      "productId" uuid NOT NULL,
      "categoryId" uuid NOT NULL,
      CONSTRAINT "PK_product_categories" PRIMARY KEY ("productId", "categoryId"),
      CONSTRAINT "FK_product" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE,
      CONSTRAINT "FK_category" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE
  )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "product_categories_category"
        `);
  }
}
