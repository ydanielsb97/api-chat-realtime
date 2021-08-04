import { createConnection } from "typeorm";

export const connection = async () => {
    return await createConnection();
}