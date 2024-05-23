import { Employee } from "../interfaces/employee"
import { APISearchError}  from "../utils/APIerror"
import { EmployeeModel } from "../models/employee"

export async function getUsers(): Promise<Employee[]>{
    const usersData = EmployeeModel.find()
    return usersData
}

export async function getUser(id : string): Promise<Employee>{
    const individualUser = await EmployeeModel.findById({_id : id})
    if (!individualUser){
        throw new APISearchError(404, `User with id ${id} not found`)
    }
    return individualUser as any
}

export async function AddUsers(user: Employee){
    const addedUser = EmployeeModel.insertMany(user)
    return addedUser
}

export async function DeleteUsers(id : any){
    const deletedUser = EmployeeModel.findOneAndDelete({_id : id})
    return deletedUser
}

export async function UpdateUsers(id : any, body : any){
    const updatedRoom = EmployeeModel.findOneAndUpdate({_id: id}, body, {new: true})
    return updatedRoom
}