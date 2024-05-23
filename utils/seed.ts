import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt"
import { BookingModel } from "../models/bookings";
import { ReviewsModel } from "../models/reviews";
import { RoomModel } from "../models/rooms";
import { EmployeeModel } from "../models/employee";
import { Booking } from '../interfaces/booking';
import { Reviews } from "../interfaces/reviews";
import { Room } from '../interfaces/room';
import { Employee } from '../interfaces/employee';
const dbConnect = require("../connection")

BookingModel.collection.drop();
ReviewsModel.collection.drop();
RoomModel.collection.drop();
EmployeeModel.collection.drop();

export function createBookings() : Booking[] {
    const bookingsList : Booking[] = [];
    for (let i = 0; i < 10; i++) {
        bookingsList.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            order_date: faker.date.between({from: "01/01/2024", to: "01/04/2024"}),
            booking_Time: faker.date.anytime(),
            check_in: faker.date.between({from: "01/04/2024", to: "01/05/2024"}),
            check_inTime: faker.date.anytime(),
            check_out: faker.date.between({from: "01/05/2024", to: "01/09/2025"}),
            check_OutTime: faker.date.anytime(),
            room_type: faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Bed Superior", "Suite"]),
            status: faker.helpers.arrayElement(["Check In", "Check Out", "In Progress"])
        })
    }
    return bookingsList;
}

export function createReviews(): Reviews[] {
    const reviewsList : Reviews[] = [];
    for (let i = 0; i < 10; i++){
        const review_customer = faker.person.fullName();
        const review_customerMail = faker.internet.email({firstName : review_customer}).toLowerCase();
        reviewsList.push({
            review_date: faker.date.anytime(),
            review_time: faker.date.anytime(),
            review_customer: review_customer,
            review_customerMail: review_customerMail,
            review_customerPhone: faker.phone.number(),
            review_comment: faker.lorem.paragraph(10),
        })
    }
    return reviewsList;
}

export function createRooms(): Room[] {
    const roomsList : Room[] = [];
    for (let i = 0; i < 10; i++){
        roomsList.push({
            room_code: faker.helpers.arrayElement(["Deluxe A-71611", "Deluxe A-23130", "Simple B-95231", "Simple B-20129"]),
            room_floor: faker.helpers.arrayElement(["Floor A-2", "Floor A-3", "Floor A-1"]),
            room_type: faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Bed Superior", "Suite"]),
            room_amenities: faker.helpers.arrayElement(["Free Wifi, Gym, swimming-pool, parking, spa, bar & lounge", "Free Wifi, parking, bar & lounge"]),
            room_rate: faker.helpers.arrayElement(["$145", "$190", "$250", "$70"]),
            room_status: faker.helpers.arrayElement(["Available", "Booked"])
        })
    }
    return roomsList;
}

export function createEmployees(): Employee[] {
    const employeesList : Employee[] = [];
    const password = faker.internet.password({length: 12});
    for (let i = 0; i < 10; i++){
        const employee_fullName = faker.person.fullName();
        const employee_email = faker.internet.email({ firstName: employee_fullName, provider: "hotelmiranda.com"}).toLowerCase();
        employeesList.push({
            employee_fullName: employee_fullName,
            employee_email: employee_email,
            employee_password: bcrypt.hashSync(password, 10),
            employee_startDate: faker.date.anytime(),
            employee_description: faker.helpers.arrayElement(["VP Accounting", "Assistant Professor", "Paralegal", "Marketing Assistant", "Senior Quality Engineer", "Junior Executive", "Internal Auditor", "Assistant Manager", "Physical Therapy Assistant", "Operator"]),
            employee_phone: faker.phone.number(),
            employee_status: faker.helpers.arrayElement(["Active", "Inactive"]),
        })
    }
    return employeesList;
}

async function DBSeeder(){
    const bookings = createBookings();
    const reviews = createReviews();
    const rooms = createRooms();
    const employees = createEmployees();

    await BookingModel.insertMany(bookings);
    await ReviewsModel.insertMany(reviews);
    await RoomModel.insertMany(rooms);
    await EmployeeModel.insertMany(employees);
}


DBSeeder();



