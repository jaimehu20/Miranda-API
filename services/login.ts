import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { APISearchError}  from "../utils/APIerror"

dotenv.config();

export async function login(data: {email: string, password: string}){
    const { email, password } = data;
    if (email === "admin@hotelmiranda.com" && password === "1234"){
        const userData = {email, password };
        const token = jwt.sign(userData, process.env.SECRET_TOKEN as string, {expiresIn: "30m"})
        return { token };
    } else {
        throw new APISearchError(400, "Invalid email or password")
    }
}