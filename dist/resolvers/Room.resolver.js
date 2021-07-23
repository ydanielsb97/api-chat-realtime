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
exports.RoomResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Message_entity_1 = require("../database/entity/Message.entity");
const Room_entity_1 = require("../database/entity/Room.entity");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const Room_respoitory_1 = require("../respository/Room.respoitory");
let RoomResolver = class RoomResolver {
    constructor(_roomRepository) {
        this._roomRepository = _roomRepository;
        this._roomRepository = typeorm_1.getCustomRepository(Room_respoitory_1.RoomRepository);
    }
    pingRoom() {
        return "Pong!";
    }
    createRoom(name, description, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._roomRepository.newRoom({ name, description });
            if (res.error) {
                context.res.json({ error: res.error });
                return false;
            }
            context.res.json({ res });
            return true;
        });
    }
    findAllRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._roomRepository.findAll();
        });
    }
    findMessagesByRoomId(roomId, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield this._roomRepository.findMessagesByRoom(roomId);
            //@ts-ignore
            if (messages.error)
                return res.json({ error: messages.error });
            return messages;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    type_graphql_1.UseMiddleware(auth_middleware_1.isAuthenticated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomResolver.prototype, "pingRoom", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(auth_middleware_1.isAuthenticated),
    __param(0, type_graphql_1.Arg('name')), __param(1, type_graphql_1.Arg('description')), __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "createRoom", null);
__decorate([
    type_graphql_1.Query(() => [Room_entity_1.Room]),
    type_graphql_1.UseMiddleware(auth_middleware_1.isAuthenticated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "findAllRooms", null);
__decorate([
    type_graphql_1.Query(() => [Message_entity_1.Message]),
    type_graphql_1.UseMiddleware(auth_middleware_1.isAuthenticated),
    __param(0, type_graphql_1.Arg('roomId')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "findMessagesByRoomId", null);
RoomResolver = __decorate([
    type_graphql_1.Resolver(),
    __metadata("design:paramtypes", [Room_respoitory_1.RoomRepository])
], RoomResolver);
exports.RoomResolver = RoomResolver;
