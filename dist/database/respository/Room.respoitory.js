"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.RoomRepository = void 0;
const typeorm_1 = require("typeorm");
const Room_entity_1 = require("../entity/Room.entity");
let RoomRepository = class RoomRepository extends typeorm_1.Repository {
    newRoom(createRoomDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const validName = yield this.findOne({
                where: {
                    name: createRoomDto.name
                }
            });
            if (validName)
                return { created: false, error: "This name is used by other room", room: null };
            const modelRoom = this.create(createRoomDto);
            const room = yield this.save(modelRoom);
            return { created: true, room };
        });
    }
    findWithRelations(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this.findOne(roomId, {
                relations: ['users', 'messages']
            });
            if (!room)
                return { error: "Room not found" };
            return room;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({ select: ['name', 'description', 'id'], relations: ['users'] });
        });
    }
    findUsersByRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this.findOne(roomId, {
                relations: ['users']
            });
            if (!room)
                return { error: "Room not found" };
            return room === null || room === void 0 ? void 0 : room.users;
        });
    }
    findMessagesByRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this.findOne(roomId, {
                relations: ['messages']
            });
            if (!room)
                return { error: "Room not found" };
            return room === null || room === void 0 ? void 0 : room.messages;
        });
    }
};
RoomRepository = __decorate([
    typeorm_1.EntityRepository(Room_entity_1.Room)
], RoomRepository);
exports.RoomRepository = RoomRepository;
