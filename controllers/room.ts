import express, {Request, Response } from "express";
import { data } from "../data/RoomsList"
import { Room } from "../interfaces/room"

export const RoomController = express.Router();

RoomController.get("/rooms", (_req: Request, res: Response) => {
    res.json(data);
})

RoomController.get("/rooms/:room_id", (_req: Request, res: Response) => {
    res.json(data.find((room : Room) => room.room_id === _req.params.room_id))
})

RoomController.post("/rooms", (_req: Request, res: Response) => {
    res.json("post new room")
})

RoomController.post("/rooms/:room_id", (_req: Request, res: Response) => {
    res.json("patch room")
})

RoomController.post("/rooms/:room_id", (_req: Request, res: Response) => {
    res.json("delete room")
})