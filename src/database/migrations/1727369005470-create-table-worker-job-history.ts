import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableWorkerJobHistory1727369005470 implements MigrationInterface {
    name = 'CreateTableWorkerJobHistory1727369005470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "worker_job_history" ("id" SERIAL NOT NULL, "worker_id" integer NOT NULL, "operation_type" character varying NOT NULL, "job_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_6285f288157b553172dfbbc5234" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "worker_job_history" ADD CONSTRAINT "FK_43ef4ba4824926f82fe02dc6f30" FOREIGN KEY ("worker_id") REFERENCES "worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker_job_history" DROP CONSTRAINT "FK_43ef4ba4824926f82fe02dc6f30"`);
        await queryRunner.query(`DROP TABLE "worker_job_history"`);
    }

}
