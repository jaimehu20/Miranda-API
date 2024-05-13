import express, {Request, Response } from "express"

const app = express();

app.get("/", (_req : Request, res : Response) => {
    res.send("This is my first node server");
});

app.listen(3000, () => {
    console.log("server is actually running on port", 3000);
});