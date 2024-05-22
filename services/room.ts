import { data } from "../data/RoomsList"
import { Room } from "../interfaces/room"
import { RoomModel } from "../models/rooms"
import { APISearchError}  from "../utils/APIerror"

export async function getRooms(): Promise<Room[]>{
    const roomsData = RoomModel.find()
    return roomsData
}

export async function getRoom(id : string): Promise<Room>{
    const individualRoom = await RoomModel.findById({_id: id})
    if (!individualRoom){
        throw new APISearchError(404, `Room with id ${id} not found`)
    }
    return individualRoom as any
}

export async function AddRooms(room : Room){
    const addedRoom = RoomModel.insertMany(room)
    return addedRoom;
}

export async function DeleteRooms(id : any){
    const deletedRoom = RoomModel.findOneAndDelete({_id: id})
    return deletedRoom
}

export async function UpdateRooms(id : any, body : any){
    const updatedRoom = RoomModel.findOneAndUpdate({_id: id}, body, {new: true})
    return updatedRoom
}