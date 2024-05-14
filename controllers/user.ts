import express, { Request, Response } from "express"
import { getUsers, getUser } from "../services/user"

export const UserController = express.Router();

UserController.get("/users", async (_req: Request, res: Response) => {
    try {
        const allUsers = await getUsers()
        return res.json(allUsers)
    } catch(error){
        console.log("error")
        return res.status(500).json({ error: "Error fetching bookings" });
    }
})

UserController.get("/users/:employee_id", async (_req: Request, res: Response) => {
    try {
        const id = _req.params.employee_id;
        const individualUser = await getUser(id);
        return res.json(individualUser)

    } catch(error){
        console.log("error")
        return res.status(500).json({ error: "Error fetching bookings" });
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