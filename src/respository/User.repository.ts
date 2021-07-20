import { EntityRepository, Repository } from "typeorm";
import { User } from "../database/entity/User.entity";
import { CreateUserDto } from "../dto/CreateUser.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async creation(createUserDto: CreateUserDto) {
        const userExists = await this.findOne({
            where: {
                userName: createUserDto.userName
            }
        })

        if(userExists) return {created: false, error: "User already exists"}
        
        const newUser = this.create(createUserDto);

        return await this.save(newUser);
    }
}
