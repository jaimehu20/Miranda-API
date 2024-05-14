import { data } from "../data/EmployeeData"
import { User } from "../interfaces/user"

export async function getUsers(): Promise<User[]>{
    if (!data){
        console.log("error")
    }
    return data
}

export async function getUser(id : string): Promise<User>{
    const individualUser = data.find((employee) => employee.employee_id === id)
    if (!individualUser){
        console.log("error")
    }
    return individualUser as User
}