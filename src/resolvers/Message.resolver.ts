import { Mutation, Query, Resolver } from "type-graphql";


@Resolver()
 export class MessageResolver {
    @Query(() => String)
    Ping(){
        return "Pong!"
    }

 }