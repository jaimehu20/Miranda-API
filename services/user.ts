import { Employee } from "../interfaces/employee";
import { EmployeeModel } from "../models/employee";
import { sqlInjector } from "../utils/sqlInjector";
import { connection } from "../mysqlConnect";

export async function getUsers(): Promise<Employee[]>{
    try {
        connection.connect();
        const queryResult = await new Promise<Employee[]>((resolve, reject) => {
            connection.query('SELECT * FROM employees', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results as Employee[])
                }
            });
        });
        return queryResult
    } catch(error){
        console.error(error)
        throw error;
    }
}

export async function getUser(id : string): Promise<Employee[]>{
    try {
        connection.connect();
        const queryResult = await new Promise<Employee[]>((resolve, reject) => {
            connection.query(`SELECT * FROM employees WHERE employee_id = ${id}`, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results as Employee[])
                }
            });
        });
        return queryResult
    } catch(error){
        console.error(error)
        throw error;
    }
}

export async function AddUsers(user: Employee){
    const addedUser = sqlInjector("employees", user)
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