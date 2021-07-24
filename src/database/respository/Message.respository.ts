import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Message } from "../entity/Message.entity";
import { CreateMessageDto } from "../../dto/CreateMessage.dto";
import { RoomRepository } from "./Room.respoitory";
import { UserRepository } from "./User.repository";


@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
    constructor(
        public readonly _userRepository: UserRepository,
        public readonly _roomRepository: RoomRepository
        
    ){
        super()
        this._userRepository = getCustomRepository(UserRepository);
        this._roomRepository = getCustomRepository(RoomRepository);
    }



    async newMessage ({ text, uuid, roomId }: CreateMessageDto){

        const room = await this._roomRepository.findOne(roomId)
        const user = await this._userRepository.findOne({where: { uuid }});

        if(!user) return {success: false, message: "User not found"};
        if(!room) return {success: false, message: "Room not found"};

        const model = this.create({text, user, room});

        const newMessage = await this.save(model);

        return {success: true, message: "Created", data: [newMessage]};

    }

    async findMessagesWithRelations(){
        return await this.find({ relations: ['user', 'room']})
    }

    async findMessagesByRoom(roomId: number){

        return await this._roomRepository.find({ where: { id: roomId }, relations: ['messages', 'messages.user'] })

    }




}