import express, {NextFunction, Request, Response } from "express";
import { getRooms, getRoom, AddRooms, DeleteRooms, UpdateRooms } from "../services/room";

export const RoomController = express.Router();

RoomController.get("/rooms", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allRooms = await getRooms();
        return res.json({allRooms})
    } catch(error){
        next(error)
    }
})

RoomController.get("/rooms/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const individualRoom = await getRoom(id);
        return res.json({individualRoom})
    } catch(error){
        next(error)
    }
})

RoomController.post("/rooms", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const addRoom = AddRooms(req.body)
        res.json({message: "Room added successfully"})
    } catch(error){
        next(error)
    }
})

RoomController.delete("/rooms/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const deleteRoom = await DeleteRooms(id)
        res.json({message: `Room with id ${id} deleted successfully`})
    } catch(error){
        next(error)
    }
})

RoomController.patch("/rooms/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const updateRoom = await UpdateRooms(id, req.body)
        res.json({message: `Room with id ${id} updated successfully`})
    } catch(error){
        next(error)
    }
})