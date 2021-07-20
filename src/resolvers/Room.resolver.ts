import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
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

 }