import { Field, ObjectType } from "type-graphql";
import { Message } from "../database/entity/Message.entity";

@ObjectType()
export class ResNewMessage {

    @Field(() => Boolean)
    success!: boolean;

    @Field(() => String)
    message!: string;


    @Field(() => [Message])
    data?: Message[];
}