import { data } from "../data/EmployeeData"
import { User } from "../interfaces/user"
import { APISearchError}  from "../utils/APIerror"

export async function getUsers(): Promise<User[]>{
    if (!data){
        throw new APISearchError(404, "Users not found")
    }
    return data
}

export async function getUser(id : string): Promise<User>{
    const individualUser = data.find((employee) => employee.employee_id === id)
    if (!individualUser){
        throw new APISearchError(404, `User with id ${id} not found`)
    }
    return individualUser as User
}