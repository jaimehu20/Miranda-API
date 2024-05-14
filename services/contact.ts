import { data } from "../data/CustomerData"
import { Contact } from "../interfaces/contact"

export async function getComments(): Promise<Contact[]>{
    if(!data){
        console.log("error")
    }
    return data
}

export async function getComment(id : string): Promise<Contact>{
    const individualReview = data.find((review) => review.comment_id === parseInt(id))
    if (!individualReview){
        console.log("error")
    }
    return individualReview as Contact
}