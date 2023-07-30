import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: string;

    @Column({ default: true})
    Active: boolean;

    @Column({default: ""})
    image: string
}
