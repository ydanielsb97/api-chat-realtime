"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const typeorm_1 = require("typeorm");
const User_repository_1 = require("../database/respository/User.repository");
exports.Account = () => {
    return typeorm_1.getCustomRepository(User_repository_1.UserRepository);
};
