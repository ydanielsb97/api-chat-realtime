"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenServiceInstance = exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../config/constants");
class TokenService {
    generate(userId) {
        return jsonwebtoken_1.default.sign({ userId }, constants_1.SECRET_KEY, {
            expiresIn: 15000
        });
    }
    verify(token) {
        return jsonwebtoken_1.default.verify(token, constants_1.SECRET_KEY);
    }
}
exports.TokenService = TokenService;
exports.tokenServiceInstance = new TokenService();
