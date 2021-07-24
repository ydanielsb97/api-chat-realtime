import { Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { User } from "../database/entity/User.entity";
import { CreateUserDto } from "../dto/CreateUser.dto";
import { LoginUserDto, resLoginUser } from "../dto/LoginUser.dto";
import { ContextI } from "../interfaces/context.interface";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { UserRepository } from "../database/respository/User.repository";
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

    @UseMiddleware(isAuthenticated)
    @Query(() => [User])
    async findAllWithRooms(){
         return await this._userRepository.findAllWithRooms();
    }

    @UseMiddleware(isAuthenticated)
    @Query(() => [User])
    async findAllUsers(){
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

        if(!toAuth.data) return context.res.json(toAuth);
     
        context.res.cookie("token", toAuth.data.token, {maxAge: 50000000, httpOnly: true});
   
        return toAuth;
    }

    @Mutation(() => Boolean)
    async userToRoom(@Arg('uuid') uuid: string, @Arg('roomId') roomId: number){
        return await this._userRepository.UsertoRoom(uuid, roomId);
    }

}