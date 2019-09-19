import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1568923046976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" text NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "visitId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rate" ("id" SERIAL NOT NULL, "visitId" integer, "name" character varying NOT NULL, "score" double precision NOT NULL, "calculatedScore" boolean NOT NULL DEFAULT false, "parentId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2618d0d38af322d152ccc328f33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "visit" ("id" SERIAL NOT NULL, "userId" integer, "comment" character varying, "visitDate" TIMESTAMP NOT NULL, "score" double precision NOT NULL, "placeId" integer, "private" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9919ef5a07627657c535d8eb88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "place_types_enum" AS ENUM('RESTAURANT', 'CAFE')`);
        await queryRunner.query(`CREATE TABLE "place" ("id" SERIAL NOT NULL, "providerId" character varying NOT NULL, "userId" integer, "types" "place_types_enum" array, "priceLevel" integer NOT NULL DEFAULT 0, "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "want_to_visit" ("id" SERIAL NOT NULL, "placeProviderId" character varying NOT NULL, "userId" integer, "visited" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0e191f30e6e7390c7571853ecd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "place_tags_tag" ("placeId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_82382bb5127a733a1237151a885" PRIMARY KEY ("placeId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1e777ee2e346998e941c0f886a" ON "place_tags_tag" ("placeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1af67ea67a5d14e8655880d062" ON "place_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_7590d8527200bdb9367bd60d47e" FOREIGN KEY ("visitId") REFERENCES "visit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rate" ADD CONSTRAINT "FK_6eebf915db7aaa51f245236d53f" FOREIGN KEY ("visitId") REFERENCES "visit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rate" ADD CONSTRAINT "FK_36c070c541a376ea4a80ac435e5" FOREIGN KEY ("parentId") REFERENCES "rate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_27531e380326b478dacdd7b86d9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_37fb4879fa39d08b6040c074abc" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "FK_f6bdcc6c120ebfeeb91e2187082" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place_tags_tag" ADD CONSTRAINT "FK_1e777ee2e346998e941c0f886ae" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place_tags_tag" ADD CONSTRAINT "FK_1af67ea67a5d14e8655880d0622" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "place_tags_tag" DROP CONSTRAINT "FK_1af67ea67a5d14e8655880d0622"`);
        await queryRunner.query(`ALTER TABLE "place_tags_tag" DROP CONSTRAINT "FK_1e777ee2e346998e941c0f886ae"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "FK_f6bdcc6c120ebfeeb91e2187082"`);
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_37fb4879fa39d08b6040c074abc"`);
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_27531e380326b478dacdd7b86d9"`);
        await queryRunner.query(`ALTER TABLE "rate" DROP CONSTRAINT "FK_36c070c541a376ea4a80ac435e5"`);
        await queryRunner.query(`ALTER TABLE "rate" DROP CONSTRAINT "FK_6eebf915db7aaa51f245236d53f"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_7590d8527200bdb9367bd60d47e"`);
        await queryRunner.query(`DROP INDEX "IDX_1af67ea67a5d14e8655880d062"`);
        await queryRunner.query(`DROP INDEX "IDX_1e777ee2e346998e941c0f886a"`);
        await queryRunner.query(`DROP TABLE "place_tags_tag"`);
        await queryRunner.query(`DROP TABLE "want_to_visit"`);
        await queryRunner.query(`DROP TABLE "place"`);
        await queryRunner.query(`DROP TYPE "place_types_enum"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "visit"`);
        await queryRunner.query(`DROP TABLE "rate"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
