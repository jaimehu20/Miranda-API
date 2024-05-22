import { Schema, model, connect } from "mongoose"
import { Reviews } from "../interfaces/reviews"

const ContactSchema = new Schema<Reviews>({
    review_date: {type: Date, required: true},
    review_time: {type: Date, required: true},
    review_customer: {type: String, required: true},
    review_customerMail: {type: String, required: true},
    review_customerPhone: {type: String, required: true},
    review_comment: {type: String, required: true}
},{ versionKey: false })

export const ReviewsModel = model<Reviews>('Contact', ContactSchema);