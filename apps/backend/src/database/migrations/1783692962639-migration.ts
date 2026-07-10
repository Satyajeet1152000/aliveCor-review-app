import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1783692962639 implements MigrationInterface {
    name = 'Migration1783692962639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" BIGSERIAL NOT NULL, "name" character varying(150) NOT NULL, "url" text NOT NULL, "status" character varying(20) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" BIGSERIAL NOT NULL, "product_id" bigint NOT NULL, "rating" integer NOT NULL, "title" character varying, "description" text, "reviewed_at" TIMESTAMP NOT NULL, "review_url" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_de31025de9e4d3c576a13f583bb" UNIQUE ("review_url"), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
