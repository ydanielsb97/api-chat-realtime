import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/constants";

export class TokenService {

    public generate (uuid: string, userName: string) {
        return jwt.sign({uuid, userName}, SECRET_KEY, {
            expiresIn: 15000
        });
    }

    public verify (token: string) {
        return jwt.verify(token, SECRET_KEY);
    }
}

export const tokenServiceInstance = new TokenService();