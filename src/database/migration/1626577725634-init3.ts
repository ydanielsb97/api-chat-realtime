import {MigrationInterface, QueryRunner} from "typeorm";

export class init31626577725634 implements MigrationInterface {
    name = 'init31626577725634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_64583a890d0fb93de80bfe6cceb"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_05a47ccb3b5d6cb85d166b5e777"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "roomIdId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "roomId" integer`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "roomId"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "roomIdId" integer`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_05a47ccb3b5d6cb85d166b5e777" FOREIGN KEY ("roomIdId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_64583a890d0fb93de80bfe6cceb" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
