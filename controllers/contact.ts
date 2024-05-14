import express, { Request, Response } from "express"
import { getComments, getComment } from "../services/contact"

export const ContactController = express.Router()

ContactController.get("/customer-reviews", async (_req: Request, res: Response) => {
    try {
        const reviews = await getComments();
        return res.json(reviews);
    } catch(error){
        console.log("error")
        return res.status(500).json({ error: "Error fetching reviews" });
    }
})

ContactController.get("/customer-reviews/:comment_id", async (_req: Request, res: Response)=> {
    try {
        const id = _req.params.comment_id
        const individualReview = await getComment(id)
        return res.json(individualReview)
    } catch(error) {
        console.log("error")
        return res.status(500).json({ error: "Error fetching reviews" });
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