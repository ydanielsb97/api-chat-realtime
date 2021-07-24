import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class CreateMessageDto {

    @Field()
    text!: string;

    @Field(() => Int)
    roomId!: number;

    @Field()
    uuid!: string;

}
