import { Schema, model, connect } from "mongoose"
import { Room } from "../interfaces/room"

const RoomSchema = new Schema<Room>({
    room_code: {type: String},
    room_floor: {type: String},
    room_type: {type: String},
    room_amenities: {type: String},
    room_rate: {type: String},
    room_status: {type: String}
},{ versionKey: false })

export const RoomModel = model<Room>('Room', RoomSchema);