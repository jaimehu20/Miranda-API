import express, { NextFunction, Request, Response } from "express";
import { getUsers, getUser } from "../services/user";

export const UserController = express.Router();

UserController.get("/users", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const allUsers = await getUsers()
        return res.json({allUsers})
    } catch(error){
        console.error(error)
        next(error)
    }
})

UserController.get("/users/:employee_id", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const id = _req.params.employee_id;
        const individualUser = await getUser(id);
        return res.json({individualUser})

    } catch(error){
        console.error(error)
        next(error)
    }
})

UserController.post("/users", (_req: Request, res: Response) => {
    res.json("new user")
})

UserController.post("/users/:employee_id", (_req: Request, res: Response) => {
    res.json("patch user")
})

UserController.post("/users/:employee_id", (_req: Request, res: Response) => {
    res.json("delete user")
})