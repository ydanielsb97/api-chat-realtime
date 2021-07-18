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
exports.init31626577725634 = void 0;
class init31626577725634 {
    constructor() {
        this.name = 'init31626577725634';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_64583a890d0fb93de80bfe6cceb"`);
            yield queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_05a47ccb3b5d6cb85d166b5e777"`);
            yield queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "userIdId"`);
            yield queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "roomIdId"`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD "userId" integer`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD "roomId" integer`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8"`);
            yield queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
            yield queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "roomId"`);
            yield queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "userId"`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD "roomIdId" integer`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD "userIdId" integer`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_05a47ccb3b5d6cb85d166b5e777" FOREIGN KEY ("roomIdId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_64583a890d0fb93de80bfe6cceb" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.init31626577725634 = init31626577725634;
