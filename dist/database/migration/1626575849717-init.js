"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init1626575849717 = void 0;
class init1626575849717 {
    constructor() {
        this.name = 'init1626575849717';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "roomIdId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "rooms" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "userIdId" integer, "roomIdId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3a997bc21ef8c6902d75f96f897" FOREIGN KEY ("roomIdId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_64583a890d0fb93de80bfe6cceb" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_05a47ccb3b5d6cb85d166b5e777" FOREIGN KEY ("roomIdId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_05a47ccb3b5d6cb85d166b5e777"`);
            yield queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_64583a890d0fb93de80bfe6cceb"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3a997bc21ef8c6902d75f96f897"`);
            yield queryRunner.query(`DROP TABLE "messages"`);
            yield queryRunner.query(`DROP TABLE "rooms"`);
            yield queryRunner.query(`DROP TABLE "users"`);
        });
    }
}
exports.init1626575849717 = init1626575849717;
