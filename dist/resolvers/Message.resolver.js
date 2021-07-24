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
exports.MessageResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Message_entity_1 = require("../database/entity/Message.entity");
const CreateMessage_dto_1 = require("../dto/CreateMessage.dto");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const Message_respository_1 = require("../database/respository/Message.respository");
let MessageResolver = class MessageResolver {
    constructor(_messageRepository) {
        this._messageRepository = _messageRepository;
        this._messageRepository = typeorm_1.getCustomRepository(Message_respository_1.MessageRepository);
    }
    Ping() {
        return "Pong!";
    }
    createMessage(message, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._messageRepository.newMessage(message);
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    type_graphql_1.UseMiddleware(auth_middleware_1.isAuthenticated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessageResolver.prototype, "Ping", null);
__decorate([
    type_graphql_1.Mutation(() => Message_entity_1.Message),
    type_graphql_1.UseMiddleware(auth_middleware_1.isAuthenticated),
    __param(0, type_graphql_1.Args()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateMessage_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
MessageResolver = __decorate([
    type_graphql_1.Resolver(),
    __metadata("design:paramtypes", [Message_respository_1.MessageRepository])
], MessageResolver);
exports.MessageResolver = MessageResolver;
