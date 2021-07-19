import "reflect-metadata";
import {connection} from "./database";
import {serverStart} from "./app";
import { PORT } from "./config/constants";

const main = async () => {
    
    await connection();
    console.log("Database connected");
    
    const app = await serverStart();
    app.listen(PORT, () => {

        console.log("Server running on port", PORT)
    })

}


main();