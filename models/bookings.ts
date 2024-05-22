import { Schema, model, connect } from "mongoose"
import { Booking } from "../interfaces/booking"

const BookingSchema = new Schema<Booking>({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    order_date: {type: Date, required: true},
    check_in: {type: Date, required: true},
    check_inTime: {type: Date, required: true},
    check_out: {type: Date, required: true},
    check_OutTime: {type: Date, required: true},
    booking_Time: {type: Date, required: true},
    room_type: {type: String, required: true},
    status: {type: String, required: true}
},{ versionKey: false })

export const BookingModel = model<Booking>('Booking', BookingSchema);
 