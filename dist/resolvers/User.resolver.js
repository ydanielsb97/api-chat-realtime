"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const CreateUser_dto_1 = require("../dto/CreateUser.dto");
const LoginUser_dto_1 = require("../dto/LoginUser.dto");
const User_repository_1 = require("../respository/User.repository");
// import authService from "../services/auth.service";
let UserResolver = class UserResolver {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
        this._userRepository = typeorm_1.getCustomRepository(User_repository_1.UserRepository);
        console.log(_userRepository);
    }
    Ping() {
        return "Pong!";
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(user);
            return yield this._userRepository.creation(user);
        });
    }
    login(data, { res }) {
        // const toAuth = await authService.toAutenticate(data);
        // if(!toAuth.authenticated) return toAuth;
        // res.cookie("token", toAuth.token,{ httpOnly: true, secure: true }/);
        // return toAuth;
        return "";
    }
};
__decorate([
    type_graphql_1.Mutation(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "Ping", null);
__decorate([
    type_graphql_1.Mutation(() => LoginUser_dto_1.resLoginUser),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Args()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginUser_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(),
    __metadata("design:paramtypes", [User_repository_1.UserRepository])
], UserResolver);
exports.UserResolver = UserResolver;
