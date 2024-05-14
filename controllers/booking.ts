import express, { Request, Response } from "express";
import { data } from "../data/OrderData"
import { Booking } from "../interfaces/booking"

export const BookingsController = express.Router();

BookingsController.get("/bookings", (_req : Request, res : Response) => {
    res.json(data);
})

BookingsController.get("/bookings/:id", (_req: Request, res: Response) => {
    res.json(data.find((booking : Booking) => booking.id === _req.params.id))
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