import express, { Request, Response } from "express";
import { getBooking, getBookings } from "../services/booking"

export const BookingsController = express.Router();

BookingsController.get("/bookings", async (_req : Request, res : Response) => {
    try {
        const allBookings = await getBookings();
        return res.json(allBookings)
    } catch(error){
        console.log(error)
        return res.status(500).json({ error: "Error fetching bookings" });
    }
})

BookingsController.get("/bookings/:id", async (_req: Request, res: Response) => {
    try {
        const id = _req.params.id;
        const individualBooking = await getBooking(id)
        return res.json(individualBooking)
    } catch(error) {
        console.log(error)
        return res.status(500).json({ error: "Error fetching bookings" });
    }
})

BookingsController.post("/bookings", (_req: Request, res: Response) => {
    res.send("post")
})

BookingsController.post("/bookings:id", (_req : Request, res: Response) => {
    res.send("patch")
})

BookingsController.post("/bookings:id", (_req: Request, res: Response) => {
    res.send("delete");
})