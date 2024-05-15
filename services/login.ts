import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export async function login(data: {email: string, password: string}){
    const { email, password } = data;
    if (!email && !password){
        return "Email and password are required"
    }
    if (email === "admin@hotelmiranda.com" && password === "1234"){
        const userData = {email, password };
        const token = jwt.sign(userData, process.env.SECRET_TOKEN as string, {expiresIn: "1d"})
        return { message: "loggin successful", token };
    } else {
        return "Invalid email or password"
    }
}