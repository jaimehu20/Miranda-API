import { Schema, model, connect } from "mongoose"
import { Booking } from "../interfaces/booking"

const BookingSchema = new Schema<Booking>({
    id: {type: String, required: true, unique: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    order_date: {type: String, required: true},
    check_in: {type: String, required: true},
    check_out: {type: String, required: true},
    time: {type: String, required: true},
    checkIn_hour: {type: String, required: true},
    checkOut_hour: {type: String, required: true},
    room_type: {type: String, required: true},
    status: {type: String, required: true}
})

export const BookingModel = model<Booking>('Booking', BookingSchema);
 