
import { data } from "../data/OrderData"
import { Booking } from "../interfaces/booking"
import { APISearchError}  from "../utils/APIerror"
import { BookingModel } from "../models/bookings"

export async function getBookings(): Promise<Booking[]>{
    const bookingsData = BookingModel.find();
    return bookingsData
}

export async function getBooking(id : string): Promise<Booking>{
    const individualBooking = BookingModel.findOne({id : id})
    return individualBooking as any
}

export async function AddBookings(booking : Booking){
    const addedBooking = BookingModel.insertMany(booking);
    return addedBooking
}

export async function DeleteBookings(id : any){
    const deletedBooking = BookingModel.deleteMany(id);
    return deletedBooking
}