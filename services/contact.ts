import { data } from "../data/CustomerData"
import { Contact } from "../interfaces/contact"
import { APISearchError}  from "../utils/APIerror"
import { ContactModel } from "../models/contact"

export async function getComments(): Promise<Contact[]>{
    const customerData = ContactModel.find()
    return customerData
}

export async function getComment(id : string): Promise<Contact>{
    const individualReview = ContactModel.findOne({comment_id : id})
    return individualReview as any
}