import { data } from "../data/EmployeeData"
import { User } from "../interfaces/user"
import { APISearchError}  from "../utils/APIerror"
import { UserModel } from "../models/users"

export async function getUsers(): Promise<User[]>{
    const usersData = UserModel.find()
    return usersData
}

export async function getUser(id : string): Promise<User>{
    const individualUser = UserModel.findOne({employee_id : id})
    return individualUser as any
}

export async function AddUsers(user: User){
    const addedUser = UserModel.insertMany(user)
    return addedUser
}

export async function DeleteUsers(id : any){
    const deletedUser = UserModel.deleteMany(id)
    return deletedUser
}