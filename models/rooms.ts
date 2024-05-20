import { Schema, model, connect } from "mongoose"
import { Room } from "../interfaces/room"

const RoomSchema = new Schema<Room>({
    room_id: {type: String, required: true},
    room_code: {type: String, required: true},
    room_floor: {type: String, required: true},
    room_type: {type: String, required: true},
    room_amenities: {type: String, required: true},
    room_rate: {type: String, required: true},
    room_status: {type: String, required: true}
})

const room = model<Room>('Room', RoomSchema);