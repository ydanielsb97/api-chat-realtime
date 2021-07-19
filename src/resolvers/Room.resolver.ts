import { Query, Resolver } from "type-graphql";


@Resolver()
 export class RoomResolver {

    @Query(() => String)
    ping(){
        return "Pong!"
    }

 }