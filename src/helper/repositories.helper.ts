import { getCustomRepository } from "typeorm"
import { UserRepository } from "../database/respository/User.repository"


export const Account = () => {
    return getCustomRepository(UserRepository);
}