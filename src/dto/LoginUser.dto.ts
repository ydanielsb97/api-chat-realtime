import { ArgsType, Field, ObjectType } from "type-graphql";

@ArgsType()
export class LoginUserDto{

    @Field(() => String)
    userName!: string;
    
    @Field(() => String)
    password!: string;
}

@ObjectType()
export class resLoginUser {

    @Field(() => String)
    authenticated!: boolean;

    @Field(() => String)
    token!: string | null;
}

