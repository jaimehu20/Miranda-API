import express, { NextFunction, Request, Response } from "express";
import { getBooking, getBookings } from "../services/booking";
import { APISearchError}  from "../utils/APIerror";

export const BookingsController = express.Router();

BookingsController.get("/bookings", async (req : Request, res : Response, next: NextFunction) => {
    try {
        const allBookings = await getBookings();
        return res.json(allBookings)
    } catch(error){
        return next(error)
    }
})

BookingsController.get("/bookings/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const individualBooking = await getBooking(id)
        return res.json(individualBooking)
    } catch(error) {
        console.log(error)
        next(error)
    }
})

BookingsController.post("/bookings", (req: Request, res: Response) => {
    res.send("post")
})

BookingsController.post("/bookings:id", (req : Request, res: Response) => {
    res.send("patch")
})

BookingsController.post("/bookings:id", (req: Request, res: Response) => {
    res.send("delete");
})