import { EntityRepository, Repository } from "typeorm";
import { Room } from "../entity/Room.entity";
import { CreateRoomDto } from "../../dto/CreateRoom.dto";

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {

    async newRoom(createRoomDto: CreateRoomDto){
        const validName = await this.findOne({
            where: {
                name: createRoomDto.name
            }
        })

        if(validName) return {created: false, error: "This name is used by other room", room: null}

        const modelRoom = this.create(createRoomDto);

        const room = await this.save(modelRoom);

        return { created: true, room }
    }

    async findWithRelations (roomId: number) {
        const room = await this.findOne(roomId, {
            relations: ['users', 'messages']
        })

        if(!room) return {error: "Room not found"};

        return room;
    }

    async findAll(){
        return await this.find({select: ['name', 'description', 'id'], relations:['users', 'messages']});
    }

    async findNamesRooms(){
        return await this.find({select: ['name']});
    }

    public async findUsersByRoom (roomId: number) {
        const room = await this.findOne(roomId, {
            relations: ['users']
        })

        if(!room) return {error: "Room not found"}

        return room?.users;
    }

    async findMessagesByRoom (roomId: number) {
        const room = await this.findOne(roomId, {
            relations: ['messages']
        })

        if(!room) return {error: "Room not found"}

        return room?.messages;
    }

}