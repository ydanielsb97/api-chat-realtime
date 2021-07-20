import { MiddlewareFn } from "type-graphql";
import { ContextI } from "../interfaces/context.interface";
import { tokenServiceInstance } from "../services/token.service";

export const isAuthenticated: MiddlewareFn<ContextI> = async ({ context }, next) => {

    const token = context.req.cookies["token"];

    console.log(token)
    if(!token) return context.res.json({isAuthenticated: false})

    const token_decoded: any = tokenServiceInstance.verify(token);

    if(typeof token_decoded == "string") return context.res.json({isAuthenticated: false})

    context.res.locals.userId = token_decoded.userId;

    next();

}
