import { Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { Message } from "../database/entity/Message.entity";
import { CreateMessageDto } from "../dto/CreateMessage.dto";
import { ContextI } from "../interfaces/context.interface";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { MessageRepository } from "../respository/Message.respository";


@Resolver()
 export class MessageResolver {

    constructor(
        public readonly _messageRepository: MessageRepository

    ) {
        this._messageRepository = getCustomRepository(MessageRepository);
    }



    @UseMiddleware(isAuthenticated)
    @Query(() => String)
    Ping(){
    
        return "Pong!"
    }

    @Mutation(() => Message)
    async createMessage (@Args() message: CreateMessageDto, @Ctx() {res}: ContextI){
        
        return await this._messageRepository.newMessage(message)
    }

 }