"use strict";
// import { getCustomRepository } from "typeorm";
// import { LoginUserDto } from "../dto/LoginUser.dto";
// import { UserRepository } from "../respository/User.repository";
// import tokenService from "./token.service";
// import _tokenService from "./token.service";
// class AuthService extends tokenService{
//     private readonly _userRepository = getCustomRepository(UserRepository);
//     public async toAutenticate (loginUserDto: LoginUserDto){
//         const userExists = await this._userRepository.findOne({
//             where: {
//                 userName: loginUserDto.userName
//             }
//         })
//         if(!userExists) return {authenticated: false, message:"Invalid username or password"}
//         const passValid = await userExists.comparePassword(loginUserDto.password)
//         if(!passValid) return {authenticated: false, message:"Invalid username or password"}
//         const token = this.generate(userExists.id);
//         return {authenticated: true, token}
//     }
// }
// export default new AuthService();
