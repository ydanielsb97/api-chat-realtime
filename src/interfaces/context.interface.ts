import { Request, Response } from "express";

export interface ContextI {
    req: Request,
    res: Response,
}