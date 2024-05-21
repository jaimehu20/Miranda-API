
import { data } from "../data/OrderData"
import { Booking } from "../interfaces/booking"
import { APISearchError}  from "../utils/APIerror"
import { bookingModel } from "../models/bookings"

export async function getBookings(): Promise<Booking[]>{
    if (!data){
        throw new APISearchError(404, "Bookings not found")
    }
    return data
}

export async function getBooking(id : string): Promise<Booking>{
    const individualBooking = data.find((booking) => booking.id === id);
    if (!individualBooking){
        throw new APISearchError(404, `Booking with id ${id} not found`)
    }
    return individualBooking as Booking
}

export async function AddBookings(booking : Booking){
    const addedBooking = bookingModel.insertMany(booking);
    return addedBooking
}

export async function DeleteBookings(id : any){
    const deletedBooking = bookingModel.deleteOne(id);
    return deletedBooking
}