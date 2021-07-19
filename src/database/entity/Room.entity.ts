import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./Message.entity";
import { User } from "./User.entity";


@ObjectType()
@Entity('rooms')
export class Room {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    description!: string;

    @Field(() => [User])
    @OneToMany(() => User, user => user.room )
    users!: User[];

    @Field(() => [Message])
    @OneToMany(() => Message, message => message.room )
    messages!: Message[];
}