import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export function verifyAccessToken(req: Request, res: Response, next: NextFunction){
    const header = req.get("Authorization");
    if (!header)
        return res.status(401).json({ error: true, message: "No auth header"})
    const token = header.split('Bearer ')[1];
    try {
        const tokenData = jwt.verify(token, process.env.SECRET_TOKEN as string)
        next()
    } catch(error) {
        return res.status(401).json({ error: true, message: "Not authorized"})
    }
    return
}
