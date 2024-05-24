import { Reviews } from "../interfaces/reviews"
import { APISearchError}  from "../utils/APIerror"
import { ReviewsModel } from "../models/reviews"

export async function getComments(): Promise<Reviews[]>{
    const customerData = ReviewsModel.find()
    return customerData
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