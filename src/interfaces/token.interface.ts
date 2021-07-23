import { Field, InputType, ObjectType } from "type-graphql";

export interface TokenPayloadI {
    uuid: string
}

@ObjectType()
export class UserDataI {
    
    @Field(() => String)
    userName!: string;

    @Field(() => String)
    firstName!: string;

    @Field(() => String)
    lastName!: string;

    @Field(() => String)
    uuid!: string;
}

