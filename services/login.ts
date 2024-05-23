import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { compare } from "bcrypt";
import { APISearchError}  from "../utils/APIerror"
import { EmployeeModel } from "../models/employee";
const dbConnect = require("../connection")

dotenv.config();

export async function login(data: {email: string, password: string}){
    const { email, password } = data;
    const user = await EmployeeModel.findOne({ employee_email : email })
    if (user){
        const hash = user.employee_password;
        const verify = await compare(password, hash);
        if (verify){
            const userData = {email, userName: user.employee_fullName};
            const token = jwt.sign(userData, process.env.SECRET_TOKEN as string);
            return { token }
        } else {
            throw new APISearchError(400, "Invalid email or password");
        }
    } else {
        throw new APISearchError(400, "Login failed or login data is missing, try again")
    }
}