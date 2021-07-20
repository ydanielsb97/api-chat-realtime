import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateMessageDto {

    @Field()
    text!: string;

    @Field()
    roomId!: number;

    @Field()
    userId!: number;

}
