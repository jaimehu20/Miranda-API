import { Schema, model, connect } from "mongoose"
import { User } from "../interfaces/user"

const UserSchema = new Schema<User>({
    employee_name: {type: String, required: true},
    employee_id: {type: String, required: true, unique: true},
    employee_email: {type: String, required: true},
    employee_startDate: {type: String, required: true},
    employee_description: {type: String, required: true},
    employee_phone: {type: String, required: true},
    employee_status: {type: String, required: true}
},{ versionKey: false })

export const UserModel = model<User>('User', UserSchema);