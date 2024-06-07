import { Employee } from "../interfaces/employee";
import { EmployeeModel } from "../models/employee";
import { sqlEditor, sqlInjector } from "../utils/sqlFunctions";
import { connection } from "../mysqlConnect";

export async function getUsers(): Promise<Employee[]>{
    try {
        connection.connect();
        const queryResult = await new Promise<Employee[]>((resolve, reject) => {
            connection.query('SELECT * FROM employees', (error: Error, results: Employee[]) => {
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
            connection.query(`SELECT * FROM employees WHERE employee_id = ${id}`, (error: Error, results: Employee[]) => {
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
    connection.connect();
    connection.query(`DELETE FROM employees WHERE employee_id = ${id}`)
    return 
}

export async function UpdateUsers(id : any, body : any){
    const updatedRoom = sqlEditor("employees", body, id);
    return updatedRoom
}