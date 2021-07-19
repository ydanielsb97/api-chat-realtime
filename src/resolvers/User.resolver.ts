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

    @Mutation(() => String)
    Ping(){
        return "Pong!"
    }

    @Mutation(() => resLoginUser)
    async register(@Args() user: CreateUserDto){
        console.log(user)
       return await this._userRepository.creation(user);
    }

    @Mutation(() => resLoginUser)
    async login(@Args() data: LoginUserDto, @Ctx() {res}: ContextI){

        const toAuth = await this._authService.toAutenticate(data);

        if(!toAuth.authenticated) return toAuth;

        res.cookie("token", toAuth.token,{ httpOnly: true, secure: true });

        return toAuth;
    }

}