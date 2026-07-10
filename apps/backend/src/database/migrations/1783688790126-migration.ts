import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1783688790126 implements MigrationInterface {
    name = 'Migration1783688790126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("id" BIGSERIAL NOT NULL, "external_id" character varying(255) NOT NULL, "rating" smallint NOT NULL, "title" character varying(500), "body" text NOT NULL, "author" character varying(150) NOT NULL, "reviewed_at" TIMESTAMP NOT NULL, "source" character varying(50) NOT NULL, "product_url" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2d09e75ee709453c6078dd9d5fe" UNIQUE ("external_id"), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_reviews_external_id" ON "reviews"  ("external_id") `);
        await queryRunner.query(`CREATE INDEX "idx_reviews_reviewed_at" ON "reviews"  ("reviewed_at") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_reviews_reviewed_at"`);
        await queryRunner.query(`DROP INDEX "public"."idx_reviews_external_id"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
