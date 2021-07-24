import { EntityRepository, IsNull, Not, Repository } from "typeorm";
import { User } from "../entity/User.entity";
import { CreateUserDto } from "../../dto/CreateUser.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findAllWithRooms(){
        return await this.find({
        
            where:{
                roomId: Not(IsNull())
            },
            relations: ['room']
        })
    }
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

    async UsertoRoom(uuid: string, roomId: number) {
        const user = await this.findOne({
            where: {
                uuid
            }
        })

        if(!user) return false;

        const room = await this.findOne(roomId);

        if(!room) return false;

        user.room = room as any;

        await this.save(user);

        return true;
    }
}
