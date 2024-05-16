import { data } from "../data/RoomsList"
import { Room } from "../interfaces/room"
import { APISearchError}  from "../utils/APIerror"

export async function getRooms(): Promise<Room[]>{
    if (!data){
        throw new APISearchError(404, "Rooms not found")
    }
    return data
}

export async function getRoom(id : string): Promise<Room>{
    const individualRoom = data.find((room) => room.room_id === id)
    if (!individualRoom){
        throw new APISearchError(404, `Room with id ${id} not found`)
    }
    return individualRoom as Room
}