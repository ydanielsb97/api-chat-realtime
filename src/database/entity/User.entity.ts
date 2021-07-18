import {Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, BeforeInsert, OneToMany, ManyToOne} from "typeorm";
import {hash, compare} from 'bcrypt';
import { Message } from "./Message.entity";
import { Room } from "./Room.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Generated('uuid')
    uuid!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column()
    userName!: string;
    
    @Column()
    password!: string;

    @CreateDateColumn()
    createdDate!: Date;

    @OneToMany(() => Message, message => message.user )
    messages!: Message[];
    
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
