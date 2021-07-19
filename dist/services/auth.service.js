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
const typeorm_1 = require("typeorm");
const User_repository_1 = require("../respository/User.repository");
const token_service_1 = require("./token.service");
class AuthService extends token_service_1.TokenService {
    constructor(_userRepository = typeorm_1.getCustomRepository(User_repository_1.UserRepository)) {
        super();
        this._userRepository = _userRepository;
    }
    toAutenticate(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this._userRepository.findOne({
                where: {
                    userName: loginUserDto.userName
                }
            });
            if (!userExists)
                return { authenticated: false, token: null };
            const passValid = yield userExists.comparePassword(loginUserDto.password);
            if (!passValid)
                return { authenticated: false, token: null };
            const token = this.generate(userExists.id);
            return { authenticated: true, token };
        });
    }
}
exports.default = AuthService;
