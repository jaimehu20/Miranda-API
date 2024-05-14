import { data } from "../data/OrderData"
import { Booking } from "../interfaces/booking"

export async function getBookings(): Promise<Booking[]>{
    if (!data){
        console.log("error")
    }
    return data
}

export async function getBooking(id : string): Promise<Booking>{
    const individualBooking = data.find((booking) => booking.id === id);
    if (!individualBooking){
        console.log("error")
    }
    return individualBooking as Booking
}