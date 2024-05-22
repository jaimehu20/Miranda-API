import express, { NextFunction, Request, Response } from "express"
import { getComments, getComment } from "../services/contact"
import { APISearchError}  from "../utils/APIerror"

export const ContactController = express.Router()

ContactController.get("/customer-reviews", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await getComments();
        return res.json({reviews});
    } catch(error){
        console.error(error)
        next(error)
    }
})

ContactController.get("/customer-reviews/:id", async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const id = req.params.id
        const individualReview = await getComment(id)
        return res.json({individualReview})
    } catch(error) {
        console.error(error)
        next(error)
    }
})

ContactController.post("/customer-reviews", (req: Request, res: Response) => {
    res.json("post review")
})

ContactController.post("/customer-reviews/:id", (req: Request, res: Response) => {
    res.json("patch review")
})

ContactController.post("/customer-reviews/:id", (req: Request, res: Response) => {
    res.json("delete review")
})