import { getCustomRepository } from "typeorm";
import { LoginUserDto } from "../dto/LoginUser.dto";
import { UserRepository } from "../database/respository/User.repository";
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
        });


        
        if(!userExists) return {data: null}

        const passValid = await userExists.comparePassword(loginUserDto.password)

        if(!passValid) return {data: null}

        const token = this.generate(userExists.id);

        return {
            data: {
                token,
                userData: {
                    firstName: userExists.firstName,
                    lastName: userExists.lastName,
                    userName: userExists.userName,
                    uuid: userExists.uuid
                }
            }
        }
    }
}


export default AuthService;
