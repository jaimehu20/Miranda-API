import { data } from "../data/RoomsList"
import { Room } from "../interfaces/room"
import { RoomModel } from "../models/rooms"
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

export async function AddRooms(room : Room){
    const addedRoom = RoomModel.insertMany(room)
    return addedRoom;
}

export async function DeleteRooms(id : any){
    const deletedRoom = RoomModel.deleteMany(id)
    return deletedRoom
}