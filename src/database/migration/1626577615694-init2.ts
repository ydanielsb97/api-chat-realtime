import {MigrationInterface, QueryRunner} from "typeorm";

export class init21626577615694 implements MigrationInterface {
    name = 'init21626577615694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3a997bc21ef8c6902d75f96f897"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "roomIdId" TO "roomId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_33bc07e7cd5c7e8bb7ac570f1ed" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_33bc07e7cd5c7e8bb7ac570f1ed"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "roomId" TO "roomIdId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3a997bc21ef8c6902d75f96f897" FOREIGN KEY ("roomIdId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
