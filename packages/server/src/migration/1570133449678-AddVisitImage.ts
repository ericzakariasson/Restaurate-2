import {MigrationInterface, QueryRunner} from "typeorm";

export class AddVisitImage1570133449678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "visit_image" ("id" SERIAL NOT NULL, "placeProviderId" character varying NOT NULL, "publicId" character varying NOT NULL, "url" character varying NOT NULL, "visitId" integer, "userId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b43f35c13c44d114beba07ef280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "visit_image_orders_order" ("visitImageId" integer NOT NULL, "orderId" integer NOT NULL, CONSTRAINT "PK_c90e693725d33cccabb09419e9e" PRIMARY KEY ("visitImageId", "orderId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2a0144e33053afa710654f1b72" ON "visit_image_orders_order" ("visitImageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6e4c2c9359782c7aedb301fb76" ON "visit_image_orders_order" ("orderId") `);
        await queryRunner.query(`ALTER TABLE "visit_image" ADD CONSTRAINT "FK_04a24d9987c992708a2a7239971" FOREIGN KEY ("visitId") REFERENCES "visit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visit_image" ADD CONSTRAINT "FK_d116d5032bcb17a56a60a1ed21b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visit_image_orders_order" ADD CONSTRAINT "FK_2a0144e33053afa710654f1b729" FOREIGN KEY ("visitImageId") REFERENCES "visit_image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visit_image_orders_order" ADD CONSTRAINT "FK_6e4c2c9359782c7aedb301fb76b" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "visit_image_orders_order" DROP CONSTRAINT "FK_6e4c2c9359782c7aedb301fb76b"`);
        await queryRunner.query(`ALTER TABLE "visit_image_orders_order" DROP CONSTRAINT "FK_2a0144e33053afa710654f1b729"`);
        await queryRunner.query(`ALTER TABLE "visit_image" DROP CONSTRAINT "FK_d116d5032bcb17a56a60a1ed21b"`);
        await queryRunner.query(`ALTER TABLE "visit_image" DROP CONSTRAINT "FK_04a24d9987c992708a2a7239971"`);
        await queryRunner.query(`DROP INDEX "IDX_6e4c2c9359782c7aedb301fb76"`);
        await queryRunner.query(`DROP INDEX "IDX_2a0144e33053afa710654f1b72"`);
        await queryRunner.query(`DROP TABLE "visit_image_orders_order"`);
        await queryRunner.query(`DROP TABLE "visit_image"`);
    }

}
