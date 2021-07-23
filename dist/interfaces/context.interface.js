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
exports.ResLoginI = void 0;
const type_graphql_1 = require("type-graphql");
const token_interface_1 = require("./token.interface");
let ResLoginI = class ResLoginI {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", Object)
], ResLoginI.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(() => token_interface_1.UserDataI),
    __metadata("design:type", Object)
], ResLoginI.prototype, "userData", void 0);
ResLoginI = __decorate([
    type_graphql_1.ObjectType()
], ResLoginI);
exports.ResLoginI = ResLoginI;
