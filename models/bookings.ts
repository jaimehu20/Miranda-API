import { Schema, model, connect } from "mongoose"
import { Booking } from "../interfaces/booking"

const BookingSchema = new Schema<Booking>({
    first_name: {type: String},
    last_name: {type: String},
    order_date: {type: Date},
    check_in: {type: Date},
    check_inTime: {type: Date},
    check_out: {type: Date},
    check_OutTime: {type: Date},
    booking_Time: {type: Date},
    room_type: {type: String},
    status: {type: String}
},{ versionKey: false })

export const BookingModel = model<Booking>('Booking', BookingSchema);
 