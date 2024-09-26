import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelations1727360906913 implements MigrationInterface {
    name = 'CreateRelations1727360906913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker" ADD "employer_id" integer`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "job_id" integer`);
        await queryRunner.query(`ALTER TABLE "job" ADD "employer_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_6b00222beeee4c15329bf9427f1" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_695a55087e871914b7daa666d6e" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_b29124ef862925abf6b729236eb" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_b29124ef862925abf6b729236eb"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_695a55087e871914b7daa666d6e"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_6b00222beeee4c15329bf9427f1"`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "employer_id"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "job_id"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "employer_id"`);
    }

}
