import { ArgsType, Field, InputType,  } from "type-graphql";
import { User } from "../database/entity/User.entity";

@ArgsType()
export class CreateUserDto implements Partial<User> {

    @Field(() => String)
    firstName!: string;
    
    @Field(() => String)
    lastName!: string;
    
    @Field(() => String)
    userName!: string;
    
    @Field(() => String)
    email!: string;
    
    @Field(() => String)
    password!: string;

}
