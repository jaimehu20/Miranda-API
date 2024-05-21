import express, { NextFunction, Request, Response } from "express";
import { getUsers, getUser, AddUsers, DeleteUsers } from "../services/user";

export const UserController = express.Router();

UserController.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allUsers = await getUsers()
        return res.json({allUsers})
    } catch(error){
        console.error(error)
        next(error)
    }
})

UserController.get("/users/:employee_id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.employee_id;
        const individualUser = await getUser(id);
        return res.json({individualUser})

    } catch(error){
        console.error(error)
        next(error)
    }
})

UserController.post("/users", (req: Request, res: Response, next: NextFunction) => {
    try {   
        const addUser = AddUsers(req.body)
        res.json("User added")
    } catch(error){
        next(error)
    }
})

UserController.delete("/users/:employee_id", (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const deleteUser = DeleteUsers({id})
        res.json(`User with id ${id} deleted succesfully`)
    } catch(error) {
        next(error)
    }
})

UserController.patch("/users/:employee_id", (req: Request, res: Response) => {
    res.json("patch user")
})