import { Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { ContextI } from "../interfaces/context.interface";
import { isAuthenticated } from "../middlewares/auth.middleware";


@Resolver()
 export class MessageResolver {

    @UseMiddleware(isAuthenticated)
    @Query(() => String)
    Ping(){
        return "Pong!"
    }

 }