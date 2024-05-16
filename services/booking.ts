
import { data } from "../data/OrderData"
import { Booking } from "../interfaces/booking"
import { APISearchError}  from "../utils/APIerror"

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