import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Message } from "../database/entity/Message.entity";
import { CreateMessageDto } from "../dto/CreateMessage.dto";
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



    async newMessage ({ text, userId, roomId }: CreateMessageDto){

        const room = await this._roomRepository.findOne(roomId)
        const user = await this._userRepository.findOne(userId);


        if(!room) return {error: "Room not found"};
        if(!user) return {error: "User not found"};

        const model = this.create({text, user, room});

        return await this.save(model);

    }


}