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
exports.MessageRepository = void 0;
const typeorm_1 = require("typeorm");
const Message_entity_1 = require("../entity/Message.entity");
const Room_respoitory_1 = require("./Room.respoitory");
const User_repository_1 = require("./User.repository");
let MessageRepository = class MessageRepository extends typeorm_1.Repository {
    constructor(_userRepository, _roomRepository) {
        super();
        this._userRepository = _userRepository;
        this._roomRepository = _roomRepository;
        this._userRepository = typeorm_1.getCustomRepository(User_repository_1.UserRepository);
        this._roomRepository = typeorm_1.getCustomRepository(Room_respoitory_1.RoomRepository);
    }
    newMessage({ text, uuid, roomId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this._roomRepository.findOne(roomId);
            const user = yield this._userRepository.findOne({ where: { uuid } });
            if (!user)
                return { success: false, message: "User not found" };
            if (!room)
                return { success: false, message: "Room not found" };
            const model = this.create({ text, user, room });
            const newMessage = yield this.save(model);
            return { success: true, message: "Created", data: [newMessage] };
        });
    }
    findMessagesWithRelations() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({ relations: ['user', 'room'] });
        });
    }
    findMessagesByRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._roomRepository.find({ where: { id: roomId }, relations: ['messages', 'messages.user'] });
        });
    }
};
MessageRepository = __decorate([
    typeorm_1.EntityRepository(Message_entity_1.Message),
    __metadata("design:paramtypes", [User_repository_1.UserRepository,
        Room_respoitory_1.RoomRepository])
], MessageRepository);
exports.MessageRepository = MessageRepository;
