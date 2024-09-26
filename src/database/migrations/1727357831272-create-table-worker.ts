import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableWorker1727357831272 implements MigrationInterface {
  name = 'CreateTableWorker1727357831272';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "worker" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "salary" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_dc8175fa0e34ce7a39e4ec73b94" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "worker"`);
  }
}
