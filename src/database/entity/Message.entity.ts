import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room.entity";
import { User } from "./User.entity";

@ObjectType()
@Entity('messages')
export class Message {

    
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    text!: string;

    @Field()
    @CreateDateColumn()
    createdDate!: Date;

    @Field(() => User)
    @ManyToOne(() => User, user => user.messages )
    user!: User;

    @Field(() => Room)
    @ManyToOne(() => Room, room => room.messages )
    room!: Room;

}