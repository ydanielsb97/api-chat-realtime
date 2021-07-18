import { EntityRepository, Repository } from "typeorm";
import { Message } from "../entity/Message.entity";


@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
    
}