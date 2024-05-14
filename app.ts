import express, {Request, Response } from "express"
import {BookingsController } from "./controllers/booking"
import { RoomController } from "./controllers/room"
import { UserController } from "./controllers/user"
import { ContactController } from "./controllers/contact"

export const app = express();

app.get("/", (_req : Request, res : Response) => {
    res.send("<h1>Welcome</h1>");
});

app.use(BookingsController);
app.use(RoomController);
app.use(UserController)
app.use(ContactController)