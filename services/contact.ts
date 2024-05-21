import { data } from "../data/CustomerData"
import { Contact } from "../interfaces/contact"
import { APISearchError}  from "../utils/APIerror"
import { ContactModel } from "../models/contact"

export async function getComments(): Promise<Contact[]>{
    const customerData = ContactModel.find()
    return customerData
}

export async function getComment(id : string): Promise<Contact>{
    const individualReview = await ContactModel.findOne({comment_id : id})
    if (!individualReview){
        throw new APISearchError(404, `Customer review with id ${id} not found`)
    }
    return individualReview as any
}