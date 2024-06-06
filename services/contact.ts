import { Reviews } from "../interfaces/reviews"
import { APISearchError}  from "../utils/APIerror"
import { ReviewsModel } from "../models/reviews"
import { connection } from "../mysqlConnect"

export async function getComments(): Promise<Reviews[]>{
    try {
        connection.connect();
        const queryResult = await new Promise<Reviews[]>((resolve, reject) => {
            connection.query('SELECT * FROM reviews', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results as Reviews[])
                }
            });
        });
        return queryResult
    } catch(error){
        console.error(error)
        throw error;
    }
}

export async function getComment(id : string): Promise<Reviews>{
    try {
        const individualReview = await ReviewsModel.findById({_id: id})
            if (!individualReview){
            throw new APISearchError(404, `Customer review with id ${id} not found`)
        }
        return individualReview;
    } catch(error) {
        throw new APISearchError(400, "Invalid review ID")
    }
}