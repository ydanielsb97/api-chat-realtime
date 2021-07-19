import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/constants";

class TokenService {

    protected generate (userId: number) {
        return jwt.sign({userId}, SECRET_KEY, {
            expiresIn: 15000
        });
    }

    protected verify (token: string) {
        return jwt.verify(token, SECRET_KEY);
    }
}

export default TokenService;