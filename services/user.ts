import { data } from "../data/EmployeeData"
import { User } from "../interfaces/user"
import { APISearchError}  from "../utils/APIerror"
import { UserModel } from "../models/users"

export async function getUsers(): Promise<User[]>{
    const usersData = UserModel.find()
    return usersData
}

export async function getUser(id : string): Promise<User>{
    const individualUser = await UserModel.findById({_id : id})
    if (!individualUser){
        throw new APISearchError(404, `User with id ${id} not found`)
    }
    return individualUser as any
}

export async function AddUsers(user: User){
    const addedUser = UserModel.insertMany(user)
    return addedUser
}

export async function DeleteUsers(id : any){
    const deletedUser = UserModel.findOneAndDelete({_id : id})
    return deletedUser
}

export async function UpdateUsers(id : any, body : any){
    const updatedRoom = UserModel.findOneAndUpdate({_id: id}, body, {new: true})
    return updatedRoom
}