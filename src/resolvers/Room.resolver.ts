import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { Message } from "../database/entity/Message.entity";
import { Room } from "../database/entity/Room.entity";
import { ContextI } from "../interfaces/context.interface";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { RoomRepository } from "../database/respository/Room.respoitory";


@Resolver()
 export class RoomResolver {

    constructor(
        public readonly _roomRepository: RoomRepository

    ) {
        this._roomRepository = getCustomRepository(RoomRepository);
    }


    @Query(() => String)
    @UseMiddleware(isAuthenticated)
    pingRoom(){
        return "Pong!"
    }

    @Query(() => [Room])
    @UseMiddleware(isAuthenticated)
    async findAllRooms (){
        console.log("in FindAllRoom")
        const room = await this._roomRepository.findNamesRooms();

        // context.res.json({room});
        return room 
    }
    @Mutation(() => Boolean)
    @UseMiddleware(isAuthenticated)
    async createRoom (@Arg('name') name: string, @Arg('description') description: string, @Ctx() context: ContextI){

        const res = await this._roomRepository.newRoom({name, description});

        if(res.error) {
            context.res.json({ error: res.error })
            return false;
        }

        context.res.json({ res })

        return true
    }


    @Query(() => [Message])
    @UseMiddleware(isAuthenticated)
    async findMessagesByRoomId(@Arg('roomId') roomId: number, @Ctx() { res }: ContextI){
        const messages = await this._roomRepository.findMessagesByRoom(roomId);

        //@ts-ignore
        if(messages.error) return res.json({error: messages.error});

        return messages
    }

 }