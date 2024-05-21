import express, { NextFunction, Request, Response } from "express";
import { getBooking, getBookings, AddBookings, DeleteBookings } from "../services/booking";
import { APISearchError}  from "../utils/APIerror";

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

BookingsController.post("/bookings", (req: Request, res: Response, next: NextFunction) => {
    try {
        const añadir = AddBookings(req.body)
        res.json("Booking added")
    } catch(error){
        next(error)
    }
})

BookingsController.patch("/bookings:id", (req : Request, res: Response) => {
    res.send("patch")
})

BookingsController.delete("/bookings:id", (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const deleteBooking = DeleteBookings(req.params.id)
        res.json(`Booking with id ${req.params.id} deleted succesfully`);
    } catch(error){
        next(error)
    }
})