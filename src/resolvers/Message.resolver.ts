import { Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { Message } from "../database/entity/Message.entity";
import { CreateMessageDto } from "../dto/CreateMessage.dto";
import { ContextI } from "../interfaces/context.interface";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { MessageRepository } from "../database/respository/Message.respository";
import { ResNewMessage } from "../dto/ResponseMessage.dto";
import { Room } from "../database/entity/Room.entity";


@Resolver()
 export class MessageResolver {

    constructor(
        public readonly _messageRepository: MessageRepository

    ) {
        this._messageRepository = getCustomRepository(MessageRepository);
    }



    @Query(() => String)
    @UseMiddleware(isAuthenticated)
    Ping(){
    
        return "Pong!"
    }

    @Mutation(() => ResNewMessage)
    @UseMiddleware(isAuthenticated)
    async createMessage (@Args() message: CreateMessageDto, @Ctx() {res}: ContextI){
        
        return await this._messageRepository.newMessage(message)
    }

    @Query(() => [Message])
    async findMessagesWithRelations() {
        return await this._messageRepository.findMessagesWithRelations();
    }
    @Query(() => [Room])
    async findMessgesByRoomId(@Arg('roomId') roomId: number, @Ctx() {res}: ContextI){
        const messages = await this._messageRepository.findMessagesByRoom(roomId);
        
        return messages
    }

 }