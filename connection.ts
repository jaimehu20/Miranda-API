import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const HotelMirandaDB = `mongodb+srv://jaimehudev:${process.env.MONGO_PASS}@miranda-api.vhdiiei.mongodb.net/?retryWrites=true&w=majority&appName=MIRANDA-API`
console.log(process.env.MONGO_PASS)

mongoose.connect(HotelMirandaDB)
.then( () => {
    console.log('Successfully connected to the database.')
})
.catch( (err) => {
    console.error(`Error connecting to the database. n${err}`);
})