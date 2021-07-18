import { createConnection } from "typeorm";

const connection = async () => {
    return await createConnection();
}

export default connection;