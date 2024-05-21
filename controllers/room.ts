import express, {NextFunction, Request, Response } from "express";
import { getRooms, getRoom, AddRooms, DeleteRooms } from "../services/room";

export const RoomController = express.Router();

RoomController.get("/rooms", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allRooms = await getRooms();
        return res.json({allRooms})
    } catch(error){
        console.error(error)
        next(error)
    }
})

RoomController.get("/rooms/:room_id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.room_id
        const individualRoom = await getRoom(id);
        return res.json({individualRoom})

    } catch(error){
        console.error(error)
        next(error)
    }
})

RoomController.post("/rooms", (req: Request, res: Response, next: NextFunction) => {
    try{
        const addRoom = AddRooms(req.body)
        res.json("Room added")
    } catch(error){
        next(error)
    }
})

RoomController.delete("/rooms/:room_id", (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const deleteRoom = DeleteRooms({id})
        res.json(`Room with id ${id} deleted succesfully`)
    } catch(error){
        next(error)
    }
})

RoomController.patch("/rooms/:room_id", (req: Request, res: Response) => {
    res.json("patch room")
})