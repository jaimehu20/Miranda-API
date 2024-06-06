import { Booking } from "../interfaces/booking"
import { APISearchError}  from "../utils/APIerror"
import { BookingModel } from "../models/bookings"
import { sqlInjector } from "../utils/sqlInjector";
import { connection } from "../mysqlConnect"

export async function getBookings(): Promise<any>{
    const bookingsData = connection.execute('SELECT * FROM bookings')
    return bookingsData
}

export async function getBooking(id : string): Promise<Booking>{
    try {
        const individualBooking = await BookingModel.findById({_id: id})
            if (!individualBooking) {
                throw new APISearchError(404, `Booking with id ${id} not found`)
            }
            return individualBooking
    } catch(error) {
        throw new APISearchError(400, "Invalid booking ID")
    }
}

export async function AddBookings(booking : Booking){
    const addedBooking = sqlInjector("bookings", booking)
    return addedBooking
}

export async function DeleteBookings(id : any){
    const deletedBooking = BookingModel.findOneAndDelete({_id: id});
    return deletedBooking
}

export async function UpdateBookings(id : any, body : any){
    const updatedBooking = BookingModel.findOneAndUpdate({_id: id}, body, {new: true})
    return updatedBooking
}