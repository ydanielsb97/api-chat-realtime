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
require("reflect-metadata");
const database_1 = require("./database");
const app_1 = require("./app");
const constants_1 = require("./config/constants");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.connection();
    console.log("Database connected");
    const app = yield app_1.serverStart();
    const httpServer = require("http").createServer(app);
    const io = require('socket.io')(httpServer);
    io.on('connection', (socket) => {
        console.log("new connection");
    });
    httpServer.listen(constants_1.PORT, () => {
        console.log("Server running on port", constants_1.PORT);
    });
    return io;
});
const io = main();
function default_1() {
    return __awaiter(this, void 0, void 0, function* () { yield io; });
}
exports.default = default_1;
;
