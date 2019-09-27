import {MigrationInterface, QueryRunner} from "typeorm";

export class VisitTakeAway1569605229840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "visit" ADD "takeAway" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "visit" DROP COLUMN "takeAway"`);
    }

}
