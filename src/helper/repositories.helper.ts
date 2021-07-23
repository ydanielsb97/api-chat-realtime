import { getCustomRepository } from "typeorm"
import { UserRepository } from "../respository/User.repository"


export const Account = () => {
    return getCustomRepository(UserRepository);
}