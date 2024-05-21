import { data } from "../data/RoomsList"
import { Room } from "../interfaces/room"
import { RoomModel } from "../models/rooms"
import { APISearchError}  from "../utils/APIerror"

export async function getRooms(): Promise<Room[]>{
    const roomsData = RoomModel.find()
    return roomsData
}

export async function getRoom(id : string): Promise<Room>{
    const individualRoom = RoomModel.findOne({room_id : id})
    return individualRoom as any
}

export async function AddRooms(room : Room){
    const addedRoom = RoomModel.insertMany(room)
    return addedRoom;
}

export async function DeleteRooms(id : any){
    const RoomToDelete = RoomModel.findByIdAndDelete(id)
    return RoomToDelete
}