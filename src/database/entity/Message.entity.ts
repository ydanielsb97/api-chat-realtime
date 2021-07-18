import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room.entity";
import { User } from "./User.entity";

@Entity('messages')
export class Message {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @CreateDateColumn()
    createdDate!: Date;

    @ManyToOne(() => User, user => user.messages )
    user!: User;

    @ManyToOne(() => Room, room => room.messages )
    room!: Room;

}