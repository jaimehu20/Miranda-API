import { Schema, model } from "mongoose"
import { Employee } from "../interfaces/employee"

const EmployeeSchema = new Schema<Employee>({
    employee_fullName: {type: String, required: true},
    employee_email: {type: String, required: true},
    employee_startDate: {type: Date, required: true},
    employee_description: {type: String, required: true},
    employee_phone: {type: String, required: true},
    employee_status: {type: String, required: true}
},{ versionKey: false })

export const EmployeeModel = model<Employee>('User', EmployeeSchema);