import { data } from "../data/CustomerData"
import { Contact } from "../interfaces/contact"
import { APISearchError}  from "../utils/APIerror"

export async function getComments(): Promise<Contact[]>{
    if(!data){
        throw new APISearchError(404, "Reviews not found")
    }
    return data
}

export async function getComment(id : string): Promise<Contact>{
    const individualReview = data.find((review) => review.comment_id === parseInt(id))
    if (!individualReview){
        throw new APISearchError(404, `Review with id ${id} not found`)
    }
    return individualReview as Contact
}