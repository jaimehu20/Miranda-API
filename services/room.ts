import { data } from "../data/RoomsList"
import { Room } from "../interfaces/room"

export async function getRooms(): Promise<Room[]>{
    if (!data){
        console.log("error")
    }
    return data
}

export async function getRoom(id : string): Promise<Room>{
    const individualRoom = data.find((room) => room.room_id === id)
    if (!individualRoom){
        console.log("error")
    }
    return individualRoom as Room
}