import express, { NextFunction, Request, Response } from "express";
import { getUsers, getUser, AddUsers, DeleteUsers, UpdateUsers } from "../services/user";

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

UserController.get("/users/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const individualUser = await getUser(id);
        return res.json({individualUser})

    } catch(error){
        console.error(error)
        next(error)
    }
})

UserController.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    try {   
        const addUser = AddUsers(req.body)
        res.json("User added successfully")
    } catch(error){
        next(error)
    }
})

UserController.delete("/users/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const deleteUser = await DeleteUsers(id)
        res.json(`User with id ${id} deleted succesfully`)
    } catch(error) {
        next(error)
    }
})

UserController.patch("/users/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const updateUser = await UpdateUsers(id, req.body)
        res.json(`User with id ${id} updated successfully`)
    } catch(error){
        next(error)
    }
})