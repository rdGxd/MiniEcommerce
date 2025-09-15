import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationOrderItemToUser1757939365326
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD COLUMN "userId" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "userId"`);
  }
}
