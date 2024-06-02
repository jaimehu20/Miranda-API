import express, { NextFunction, Request, Response } from "express";
import { getUsers, getUser, AddUsers, DeleteUsers, UpdateUsers } from "../services/user";

export const EmployeeController = express.Router();

EmployeeController.get("/employees", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allUsers = await getUsers()
        return res.json({allUsers})
    } catch(error){
        next(error)
    }
})

EmployeeController.get("/employees/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const individualUser = await getUser(id);
        return res.json({individualUser})

    } catch(error){
        next(error)
    }
})

EmployeeController.post("/employees", async (req: Request, res: Response, next: NextFunction) => {
    try {   
        const addUser = await AddUsers(req.body)
        res.json({message: "Employee added successfully", user: addUser})
    } catch(error){
        next(error)
    }
})

EmployeeController.delete("/employees/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const deleteUser = await DeleteUsers(id)
        res.json({message: `Employee with id ${id} deleted successfully`, user: deleteUser})
    } catch(error) {
        next(error)
    }
})

EmployeeController.patch("/employees/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const updateUser = await UpdateUsers(id, req.body)
        res.json({message: `Employee with id ${id} updated successfully`, user: updateUser})
    } catch(error){
        next(error)
    }
})