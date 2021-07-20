import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { Message } from "../database/entity/Message.entity";
import { Room } from "../database/entity/Room.entity";
import { ContextI } from "../interfaces/context.interface";
import { RoomRepository } from "../respository/Room.respoitory";


@Resolver()
 export class RoomResolver {

    constructor(
        public readonly _roomRepository: RoomRepository

    ) {
        this._roomRepository = getCustomRepository(RoomRepository);
    }


    @Query(() => String)
    pingRoom(){
        return "Pong!"
    }

    @Mutation(() => Boolean)
    async createRoom (@Arg('name') name: string, @Arg('description') description: string, @Ctx() context: ContextI){

        const res = await this._roomRepository.newRoom({name, description});

        if(res.error) {
            context.res.json({ error: res.error })
            return false;
        }

        context.res.json({ res })

        return true
    }

    @Query(() => [Room])
    async findAllRooms (){
        return await this._roomRepository.findAll();
    }

    @Query(() => [Message])
    async findMessagesByRoomId(@Arg('roomId') roomId: number, @Ctx() { res }: ContextI){
        const messages = await this._roomRepository.findMessagesByRoom(roomId);

        //@ts-ignore
        if(messages.error) return res.json({error: messages.error});

        return messages
    }

 }