import { Query, Resolver } from "type-graphql";


@Resolver()
 export class RoomResolver {

    @Query(() => String)
    pingRoom(){
        return "Pong!"
    }

 }