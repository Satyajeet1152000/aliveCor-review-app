import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1783694755466 implements MigrationInterface {
    name = 'Migration1783694755466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ADD "review_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "UQ_bfe951d9dca4ba99674c5772905" UNIQUE ("review_id")`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "UQ_de31025de9e4d3c576a13f583bb"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "UQ_de31025de9e4d3c576a13f583bb" UNIQUE ("review_url")`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "UQ_bfe951d9dca4ba99674c5772905"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "review_id"`);
    }

}
