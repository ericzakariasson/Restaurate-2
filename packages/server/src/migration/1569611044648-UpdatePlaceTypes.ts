import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePlaceTypes1569611044648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TYPE "public"."place_types_enum" RENAME TO "place_types_enum_old"`);
        await queryRunner.query(`CREATE TYPE "place_types_enum" AS ENUM('RESTAURANT', 'CAFE', 'PUB_BAR', 'FOOD_TRUCK')`);
        await queryRunner.query(`ALTER TABLE "place" ALTER COLUMN "types" TYPE "place_types_enum"[] USING "types"::"text"::"place_types_enum"[]`);
        await queryRunner.query(`DROP TYPE "place_types_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "place_types_enum_old" AS ENUM('RESTAURANT', 'CAFE')`);
        await queryRunner.query(`ALTER TABLE "place" ALTER COLUMN "types" TYPE "place_types_enum_old"[] USING "types"::"text"::"place_types_enum_old"[]`);
        await queryRunner.query(`DROP TYPE "place_types_enum"`);
        await queryRunner.query(`ALTER TYPE "place_types_enum_old" RENAME TO  "place_types_enum"`);
    }

}
