import { EntityRepository, Repository } from "typeorm";
import { Room } from "../database/entity/Room.entity";

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {

}