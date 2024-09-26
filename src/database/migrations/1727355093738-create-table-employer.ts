import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableEmployer1727355093738 implements MigrationInterface {
  name = 'CreateTableEmployer1727355093738';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "employer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_74029e6b1f17a4c7c66d43cfd34" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "employer"`);
  }
}
