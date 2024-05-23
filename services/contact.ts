import { Reviews } from "../interfaces/reviews"
import { APISearchError}  from "../utils/APIerror"
import { ReviewsModel } from "../models/reviews"

export async function getComments(): Promise<Reviews[]>{
    const customerData = ReviewsModel.find()
    return customerData
}

export async function getComment(id : string): Promise<Reviews>{
    const individualReview = await ReviewsModel.findOne({_id: id})
    if (!individualReview){
        throw new APISearchError(404, `Customer review with id ${id} not found`)
    }
    return individualReview as any
}