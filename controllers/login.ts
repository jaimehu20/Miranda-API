import express, { Request, Response } from "express";
import { login } from "../services/login";

export const LoginController = express.Router();

LoginController.post("/login", async (req: Request, res: Response) => {
    try {
        const result = await login(req.body);
        return res.status(200).json(result)
    } catch(error) {
        return error
    }
})