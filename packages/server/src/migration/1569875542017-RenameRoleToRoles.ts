import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameRoleToRoles1569875542017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "role" TO "roles"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_roles_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TYPE "user_roles_enum" RENAME TO "user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "roles" TO "role"`);
    }

}
