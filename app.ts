import express, { Request, Response } from "express"
import {BookingsController } from "./controllers/booking"
import { RoomController } from "./controllers/room"
import { UserController } from "./controllers/user"
import { ContactController } from "./controllers/contact"
import { LoginController } from "./controllers/login"
import { verifyAccessToken } from "./middleware/auth"
import { errorHandler } from "./utils/ErrorHandler"


export const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.send("Miranda Hotel API<br/> Available endpoints:<br/> /home<br/> /rooms<br/> /room/:id<br/> /reviews<br/> /review/:id <br/> /staff<br/> /staff/:id<br/> /bookings<br/> /booking/:id<br/>")
})



app.use("/", LoginController)
app.use("/", verifyAccessToken, BookingsController);
app.use("/", verifyAccessToken, RoomController);
app.use("/", verifyAccessToken, UserController)
app.use("/", verifyAccessToken, ContactController)

app.use(errorHandler)