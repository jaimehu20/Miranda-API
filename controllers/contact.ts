import express, { NextFunction, Request, Response } from "express"
import { getComments, getComment } from "../services/contact"
import { APISearchError}  from "../utils/APIerror"

export const ContactController = express.Router()

ContactController.get("/customer-reviews", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await getComments();
        return res.json({reviews});
    } catch(error){
        console.error(error)
        next(error)
    }
})

ContactController.get("/customer-reviews/:comment_id", async (_req: Request, res: Response, next: NextFunction)=> {
    try {
        const id = _req.params.comment_id
        const individualReview = await getComment(id)
        return res.json({individualReview})
    } catch(error) {
        console.error(error)
        next(error)
    }
})

ContactController.post("/customer-reviews", (_req: Request, res: Response) => {
    res.json("post review")
})

ContactController.post("/customer-reviews/:comment_id", (_req: Request, res: Response) => {
    res.json("patch review")
})

ContactController.post("/customer-reviews/:comment_id", (_req: Request, res: Response) => {
    res.json("delete review")
})