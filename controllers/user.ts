import express, { Request, Response } from "express"
import { data } from "../data/EmployeeData"
import { User } from "../interfaces/user"

export const UserController = express.Router();

UserController.get("/users", (_req: Request, res: Response) => {
    res.json(data)
})

UserController.get("/users/:employee_id", (_req: Request, res: Response) => {
    res.json(data.find((user : User) => user.employee_id === _req.params.employee_id))
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