import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableJob1727356369698 implements MigrationInterface {
  name = 'CreateTableJob1727356369698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "job" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "name" character varying NOT NULL, "salary" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "job"`);
  }
}
