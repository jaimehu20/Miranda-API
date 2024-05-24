import express, { NextFunction, Request, Response } from "express";
import { getBooking, getBookings, AddBookings, DeleteBookings, UpdateBookings } from "../services/booking";



export const BookingsController = express.Router();

BookingsController.get("/bookings", async (req : Request, res : Response, next: NextFunction) => {
    try {
        const allBookings = await getBookings();
        return res.json({allBookings})
    } catch(error){
        return next(error)
    }
})

BookingsController.get("/bookings/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const individualBooking = await getBooking(id)
        return res.json({individualBooking})
    } catch(error) {
        next(error)
    }
})

BookingsController.post("/bookings", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const addBooking = await AddBookings(req.body)
        res.json({message: "Booking added successfully"})
    } catch(error){
        next(error)
    }
})

BookingsController.delete("/bookings/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const deleteBooking = await DeleteBookings(id)
        res.json({message: `Booking with id ${id} deleted successfully`});
    } catch(error){
        next(error)
    }
})

BookingsController.patch("/bookings/:id", async (req : Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const updateBooking = await UpdateBookings(id, req.body)
        res.json({message: `Booking with id ${id} updated successfully`})
    } catch(error) {
        next(error)
    }
})