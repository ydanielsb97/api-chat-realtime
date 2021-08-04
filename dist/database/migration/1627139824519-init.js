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
exports.init1627139824519 = void 0;
class init1627139824519 {
    constructor() {
        this.name = 'init1627139824519';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_33bc07e7cd5c7e8bb7ac570f1ed"`);
            yield queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roomId" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_33bc07e7cd5c7e8bb7ac570f1ed" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_33bc07e7cd5c7e8bb7ac570f1ed"`);
            yield queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roomId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_33bc07e7cd5c7e8bb7ac570f1ed" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.init1627139824519 = init1627139824519;
