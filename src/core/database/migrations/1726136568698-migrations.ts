import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1726136568698 implements MigrationInterface {
    name = 'Migrations1726136568698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMINISTRATOR', 'MANAGER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'MANAGER', "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "bin" character varying, "created" bigint NOT NULL DEFAULT ROUND(EXTRACT(EPOCH FROM NOW())), "stopped" boolean NOT NULL DEFAULT false, "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts-users-access" ("id" SERIAL NOT NULL, "postId" integer, "userId" integer, CONSTRAINT "PK_fe96372ec3a63b4780600b80903" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "datetime" character varying(255), "sum" money NOT NULL, "txn_id" character varying(255), "result" smallint NOT NULL DEFAULT '0', "comment" text NOT NULL DEFAULT '', "type" smallint NOT NULL, "createdAt" bigint NOT NULL DEFAULT ROUND(EXTRACT(EPOCH FROM NOW())), "deviceId" integer, CONSTRAINT "UQ_eb9553b274a42f780c430e133ad" UNIQUE ("txn_id"), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts-users-access" ADD CONSTRAINT "FK_7ae3b6fcf9d88398209d8fc1693" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts-users-access" ADD CONSTRAINT "FK_69d719b038594fda4336aa932fb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_99771331d4c53070d7c585d23ed" FOREIGN KEY ("deviceId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_99771331d4c53070d7c585d23ed"`);
        await queryRunner.query(`ALTER TABLE "posts-users-access" DROP CONSTRAINT "FK_69d719b038594fda4336aa932fb"`);
        await queryRunner.query(`ALTER TABLE "posts-users-access" DROP CONSTRAINT "FK_7ae3b6fcf9d88398209d8fc1693"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "posts-users-access"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
