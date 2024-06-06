import { Booking } from "../interfaces/booking"
import { BookingModel } from "../models/bookings"
import { sqlInjector, sqlEditor } from "../utils/sqlInjector";
import { connection } from "../mysqlConnect";

export async function getBookings(): Promise<Booking[]>{
    try {
        connection.connect();
        const queryResult = await new Promise<Booking[]>((resolve, reject) => {
            connection.query('SELECT * FROM bookings', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results as Booking[])
                }
            });
        });
        return queryResult
    } catch(error){
        console.error(error)
        throw error;
    }
}

export async function getBooking(id : string): Promise<Booking[]>{
    try {
        connection.connect();
        const queryResult = await new Promise<Booking[]>((resolve, reject) => {
            connection.query(`SELECT * FROM bookings WHERE booking_id = ${id}`, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results as Booking[])
                }
            });
        });
        return queryResult
    } catch(error){
        console.error(error)
        throw error;
    }
}

export async function AddBookings(booking : Booking){
    const addedBooking = sqlInjector("bookings", booking)
    return addedBooking
}

export async function DeleteBookings(id : any){
    connection.connect();
    connection.query(`DELETE FROM bookings WHERE booking_id = ${id}`)
    return 
}

export async function UpdateBookings(id : any, body : any){
    const updatedBooking = sqlEditor("bookings", body, id);
    return updatedBooking
}