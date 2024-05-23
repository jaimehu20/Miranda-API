import express, { NextFunction, Request, Response } from "express"
import { getComments, getComment } from "../services/contact"

export const ReviewController = express.Router()

ReviewController.get("/customer-reviews", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allReviews = await getComments();
        return res.json({allReviews});
    } catch(error){
        console.error(error)
        next(error)
    }
})

ReviewController.get("/customer-reviews/:id", async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const id = req.params.id
        const individualReview = await getComment(id)
        return res.json({individualReview})
    } catch(error) {
        console.error(error)
        next(error)
    }
})

ReviewController.post("/customer-reviews", (req: Request, res: Response) => {
    res.json("post review")
})

ReviewController.post("/customer-reviews/:id", (req: Request, res: Response) => {
    res.json("patch review")
})

ReviewController.post("/customer-reviews/:id", (req: Request, res: Response) => {
    res.json("delete review")
})