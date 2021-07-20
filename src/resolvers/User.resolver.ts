import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { User } from "../database/entity/User.entity";
import { CreateUserDto } from "../dto/CreateUser.dto";
import { LoginUserDto, resLoginUser } from "../dto/LoginUser.dto";
import { ContextI } from "../interfaces/context.interface";
import { UserRepository } from "../respository/User.repository";
import AuthService from "../services/auth.service";


@Resolver()
export class UserResolver {

    constructor(
            private readonly _userRepository: UserRepository,
            private readonly _authService: AuthService
    ){
        this._userRepository = getCustomRepository(UserRepository);
        this._authService = new AuthService()
    }

    @Query(() => [User])
    async getAllUsers(){
         return await this._userRepository.find();
    }

    @Mutation(() => Boolean)
    async register(@Args() user: CreateUserDto, @Ctx() context: ContextI){
        console.log(user)
       const newUser = await this._userRepository.creation(user);

        context.res.json(newUser)

       return true;
    }

    @Mutation(() => resLoginUser)
    async login(@Args() data: LoginUserDto, @Ctx() context: ContextI){

        const toAuth = await this._authService.toAutenticate(data);

        if(!toAuth.authenticated) return toAuth;

     
        context.res.cookie("token", toAuth.token, {maxAge: 5000, httpOnly: true});
   
        return toAuth;
    }

}