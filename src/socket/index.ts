
export const changeRoom = (socket: any, oldRoom: string,  roomName: string) => {

    //@ts-ignore
    socket.leave(oldRoom);

    //@ts-ignore
    socket.join(roomName)
    //@ts-ignore
    console.log(socket.rooms)
}

export const newMessage = (socket: any, message: string, room: string) => {
    
    
}