import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationOrderItemToProduct1757939370332
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD COLUMN "productId" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "productId"`);
  }
}
