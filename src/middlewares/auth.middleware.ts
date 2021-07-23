import { NextFunction } from "express";
import { MiddlewareFn } from "type-graphql";
import { ContextI } from "../interfaces/context.interface";
import { tokenServiceInstance } from "../services/token.service";

export const isAuthenticated: MiddlewareFn<ContextI> = async ({ context }, next: NextFunction) => {

    const token = context.req.cookies["token"];
    
    if(!token) return context.res.json({isAuthenticated: false})

    const token_decoded = tokenServiceInstance.verify(token);

    if(typeof token_decoded == "string") return context.res.json({isAuthenticated: false})

    return next();

}
