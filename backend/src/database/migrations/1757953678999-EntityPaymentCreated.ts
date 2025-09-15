import { MigrationInterface, QueryRunner } from 'typeorm';

export class EntityPaymentCreated1757953678999 implements MigrationInterface {
  name = 'EntityPaymentCreated1757953678999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_product"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_category"`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,2) NOT NULL, "currency" character varying(3) NOT NULL, "method" "public"."payment_method_enum" NOT NULL, "status" "public"."payment_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" ADD "orderId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c0e5fdd6e2c3f3c4e2e1"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "total" numeric(10,2) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "status" "public"."order_status_enum" NOT NULL DEFAULT 'PENDENTE'`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "order" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "PK_9f0c8e4f4f4f4f4f4f4f4f4f4f4"`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD "price" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "order_item" ADD "productId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name")`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "price" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "imageUrl" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_342d06dd0583aafc156e076379" ON "product_categories_category" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_15520e638eb4c46c4fb2c61c4b" ON "product_categories_category" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_342d06dd0583aafc156e0763790" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_342d06dd0583aafc156e0763790"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_15520e638eb4c46c4fb2c61c4b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_342d06dd0583aafc156e076379"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "imageUrl" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "price" TYPE numeric(10,2)`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "description" text`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77"`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "order_item" ADD "productId" integer`);
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90"`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "PK_9f0c8e4f4f4f4f4f4f4f4f4f4f4" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "order" ADD "userId" integer`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "status" character varying NOT NULL DEFAULT 'PENDING'`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total"`);
    await queryRunner.query(`ALTER TABLE "order" ADD "total" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "order" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c0e5fdd6e2c3f3c4e2e1" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "orderId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "category" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "category" ADD "description" text`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_category" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_product" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
