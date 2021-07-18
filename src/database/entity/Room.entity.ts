import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./Message.entity";
import { User } from "./User.entity";


@Entity('rooms')
export class Room {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;

    @Column()
    description!: string;

    @OneToMany(() => User, user => user.room )
    users!: User[];

    @OneToMany(() => Message, message => message.room )
    messages!: Message[];
}