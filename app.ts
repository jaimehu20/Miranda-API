import express, { Request, Response } from "express";
import {BookingsController } from "./controllers/booking";
import { RoomController } from "./controllers/room";
import { EmployeeController } from "./controllers/user";
import { ReviewController } from "./controllers/review";
import { LoginController } from "./controllers/login";
import { verifyAccessToken } from "./middleware/auth";
import { errorHandler } from "./utils/ErrorHandler";
import cors from "cors";
const dbConnect = require("./connection");

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
    res.send("Welcome to: <h1>Miranda API</h1> This are available endpoints: <ul> <li>/login</li> <li>/bookings</li> <li>/bookings/:id</li> <li>/rooms</li> <li>/rooms/:id</li> <li>/users</li> <li>/users/:id</li> <li>/customer-reviews</li> <li>/customer-reviews/:id</li> </ul>")
})

app.use(LoginController)
app.use(verifyAccessToken, BookingsController);
app.use(verifyAccessToken, RoomController);
app.use(verifyAccessToken, EmployeeController)
app.use(verifyAccessToken, ReviewController)

app.use(errorHandler)