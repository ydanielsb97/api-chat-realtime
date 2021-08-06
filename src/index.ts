import "reflect-metadata";
import { connection } from "./database";
import { serverStart } from "./app";
import { PORT } from "./config/constants";
import * as socketActions from "./socket";

const main = async () => {


    await connection();
    console.log("Database connected");

    const app = await serverStart();


    const httpServer = require("http").createServer(app);
    const io = require('socket.io')(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket: any) => {

        console.log("new connection", socket.conn.id)

        socket.on("room-selected", (oldRoom: string, newRoom: string) => {

            console.log("EVENT room-selected", newRoom)
            socketActions.changeRoom(socket, oldRoom, newRoom)


            io.to(newRoom).emit("user-join", "One user was joined")
            io.emit("reset-messages", "");
        })

        socket.on("send-new-message", (message: any, room: string) => {
            console.log("New Message", message, room)
            io.to(room).emit("new-brodcast", message)

        })

    });



    httpServer.listen(PORT, () => {

        console.log("Server running on port", PORT)
    })

    return io;

}


main();