import { Request, Response } from "express";
import { Field, InputType, ObjectType } from "type-graphql";
import { UserDataI } from "./token.interface";

export interface ContextI {
    req: RequestI
    res: Response
}

@ObjectType()
export class ResLoginI {
    @Field(() => String)
    token!: string | null;
    @Field(() => UserDataI)
    userData!: UserDataI | null;
}

interface RequestI extends Request {
    data?: ResLoginI
}

