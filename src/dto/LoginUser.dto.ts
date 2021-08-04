import { ArgsType, Field, ObjectType } from "type-graphql";
import { ResLoginI } from "../interfaces/context.interface";

@ArgsType()
export class LoginUserDto{

    @Field(() => String)
    userName!: string;
    
    @Field(() => String)
    password!: string;
}

@ObjectType()
export class resLoginUser {

    @Field(() => ResLoginI)
    data!: ResLoginI | null;
}

