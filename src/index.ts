import "reflect-metadata";
import { connection } from "./database";
import { serverStart } from "./app";
import { PORT } from "./config/constants";

const main = async () => {


    await connection();
    console.log("Database connected");

    const app = await serverStart();


    const httpServer = require("http").createServer(app);
    const io = require('socket.io')(httpServer);
    io.on('connection', (socket: any) => {

        console.log("new connection")

    });

    httpServer.listen(PORT, () => {

        console.log("Server running on port", PORT)
    })

    return io;

}


const io = main();

export default async function () { await io};