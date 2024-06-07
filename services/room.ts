import { Room } from "../interfaces/room"
import { RoomModel } from "../models/rooms"
import { sqlEditor, sqlInjector } from "../utils/sqlFunctions"
import { connection } from "../mysqlConnect"

export async function getRooms(): Promise<Room[]>{
    try {
        connection.connect();
        const queryResult = await new Promise<Room[]>((resolve, reject) => {
            connection.query('SELECT * FROM rooms', (error: any, results: Room[]) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results as Room[])
                }
            });
        });
        return queryResult
    } catch(error){
        console.error(error)
        throw error;
    }
}

export async function getRoom(id : string): Promise<Room[]>{
    try {
        connection.connect();
        const queryResult = await new Promise<Room[]>((resolve, reject) => {
            connection.query(`SELECT * FROM rooms WHERE room_id = ${id}`, (error: Error, results: Room[]) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results as Room[])
                }
            });
        });
        return queryResult
    } catch(error){
        console.error(error)
        throw error;
    }
}

export async function AddRooms(room : Room){
    const addedRoom = sqlInjector("rooms", room)
    return addedRoom;
}

export async function DeleteRooms(id : any){
    connection.connect();
    connection.query(`DELETE FROM rooms WHERE room_id = ${id}`)
    return 
}

export async function UpdateRooms(id : any, body : any){
    const updatedRoom = sqlEditor("rooms", body, id);
    return updatedRoom
}