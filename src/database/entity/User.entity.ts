import {Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, BeforeInsert, OneToMany, ManyToOne} from "typeorm";
import {hash, compare} from 'bcrypt';
import { Message } from "./Message.entity";
import { Room } from "./Room.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity('users')
export class User {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Field()
    @Generated("uuid")
    @Column()
    uuid!: string;

    @Field()
    @Column()
    firstName!: string;

    @Field()
    @Column()
    lastName!: string;

    @Field()
    @Column()
    email!: string;

    @Field()
    @Column()
    userName!: string;
    
    @Column()
    password!: string;

    @Field()
    @CreateDateColumn()
    createdDate!: Date;

    @Field(() => [Message])
    @OneToMany(() => Message, message => message.user )
    messages!: Message[];

    @Column({nullable: true})
    roomId?: number;
    
    @Field(() => Room)
    @ManyToOne(() => Room, room => room.users )
    room!: Room;

    @BeforeInsert()
    async hashPassword(){
        return this.password = await hash(this.password,10);
    }

    async comparePassword(password: string) {
        return await compare(password, this.password);
    }
}
