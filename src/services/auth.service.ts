import { getCustomRepository } from "typeorm";
import { LoginUserDto } from "../dto/LoginUser.dto";
import { UserRepository } from "../respository/User.repository";
import {tokenServiceInstance} from "./token.service";
import {TokenService} from "./token.service";

class AuthService extends TokenService{

    constructor(
        private readonly _userRepository: UserRepository = getCustomRepository(UserRepository)
    ){
        super()
    }

    public async toAutenticate (loginUserDto: LoginUserDto){
    
        const userExists = await this._userRepository.findOne({
            where: {
                userName: loginUserDto.userName
            }
        })
        
        if(!userExists) return {authenticated: false, token: null}

        const passValid = await userExists.comparePassword(loginUserDto.password)

        if(!passValid) return {authenticated: false, token: null}

        const token = this.generate(userExists.id);

        return {authenticated: true, token}
    }
}


export default AuthService;
