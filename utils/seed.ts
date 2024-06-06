import { faker } from '@faker-js/faker';
import { Booking } from '../interfaces/booking';
import { Reviews } from "../interfaces/reviews";
import { Room } from '../interfaces/room';
import { Employee } from '../interfaces/employee';
const bcrypt = require("bcryptjs");
import { connection } from "../mysqlConnect";
import { sqlInjector } from "../utils/sqlInjector"

connection.execute('DROP TABLE IF EXISTS bookings, rooms, employees, reviews')

connection.execute(
    'CREATE TABLE bookings (booking_id int primary key auto_increment, first_name varchar(10), last_name varchar(20), order_date varchar(20), check_in varchar(20), check_inTime varchar(20), check_out varchar(20), check_OutTime varchar(20), booking_time varchar(20), room_type varchar(20), status varchar(20))'
)

connection.execute(
    'CREATE TABLE rooms (room_id int primary key auto_increment, room_code varchar(20), room_floor varchar(20), room_type varchar(20), room_amenities varchar(100), room_rate varchar(10), room_status varchar(20))'
)

connection.execute(
    'CREATE TABLE employees (employee_id int primary key auto_increment, employee_fullName varchar(50), employee_email varchar(50), employee_password varchar(255), employee_startDate varchar(20), employee_description varchar(50), employee_phone varchar(50), employee_status varchar(10))'
)

connection.execute(
    'CREATE TABLE reviews (review_id int primary key auto_increment, review_date Date, review_time varchar(20), review_customer varchar(30), review_customerMail varchar(50), review_customerPhone varchar(50), review_comment varchar(1000))'
)

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
    for(let i = 0; i < bookingsList.length; i++){
        sqlInjector("bookings", bookingsList[i]);
    }
    return bookingsList
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
    for(let i = 0; i < reviewsList.length; i++){
        sqlInjector("reviews", reviewsList[i]);
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
    for(let i = 0; i < roomsList.length; i++){
        sqlInjector("rooms", roomsList[i]);
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
    for(let i = 0; i < employeesList.length; i++){
        sqlInjector("employees", employeesList[i]);
    }
    return employeesList;
}

async function DBSeeder(){

    createBookings();
    createReviews();
    createRooms();
    createEmployees();

    connection.end()
}

DBSeeder();