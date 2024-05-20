import express, {NextFunction, Request, Response } from "express";
import { getRooms, getRoom } from "../services/room";
import { APISearchError}  from "../utils/APIerror";

export const RoomController = express.Router();

RoomController.get("/rooms", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const allRooms = await getRooms();
        return res.json({allRooms})
    } catch(error){
        console.error(error)
        next(error)
    }
})

RoomController.get("/rooms/:room_id", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const id = _req.params.room_id
        const individualRoom = await getRoom(id);
        return res.json({individualRoom})

    } catch(error){
        console.error(error)
        next(error)
    }
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