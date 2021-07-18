import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User.entity";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

}
