import { Schema, model, connect } from "mongoose"
import { Contact } from "../interfaces/contact"

const ContactSchema = new Schema<Contact>({
    comment_info: {type: String, required: true},
    comment_hour: {type: String, required: true},
    comment_id: {type: Number, required: true, unique: true},
    comment_customer: {type: String, required: true},
    comment_customerMail: {type: String, required: true},
    comment_customerPhone: {type: String, required: true},
    comment_review: {type: String, required: true}
},{ _id : false, autoIndex: false })

export const ContactModel = model<Contact>('Contact', ContactSchema);