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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resLoginUser = exports.LoginUserDto = void 0;
const type_graphql_1 = require("type-graphql");
const context_interface_1 = require("../interfaces/context.interface");
let LoginUserDto = class LoginUserDto {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], LoginUserDto.prototype, "userName", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
LoginUserDto = __decorate([
    type_graphql_1.ArgsType()
], LoginUserDto);
exports.LoginUserDto = LoginUserDto;
let resLoginUser = class resLoginUser {
};
__decorate([
    type_graphql_1.Field(() => context_interface_1.ResLoginI),
    __metadata("design:type", Object)
], resLoginUser.prototype, "data", void 0);
resLoginUser = __decorate([
    type_graphql_1.ObjectType()
], resLoginUser);
exports.resLoginUser = resLoginUser;
