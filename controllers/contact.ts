import express, { Request, Response } from "express"
import { data } from "../data/CustomerData"
import { Contact } from "../interfaces/contact"

export const ContactController = express.Router()

ContactController.get("/customer-reviews", (_req: Request, res: Response) => {
    res.json(data)
})

ContactController.get("/customer-reviews/:comment_id", (_req: Request, res: Response) => {
    res.json(data.find((review : Contact) => review.comment_id === parseInt(_req.params.comment_id) ))
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