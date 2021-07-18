import { EntityRepository, Repository } from "typeorm";
import { Message } from "../database/entity/Message.entity";


@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
    
}