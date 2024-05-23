import supertest from "supertest";
import dotenv from "dotenv"
import { app } from "../app";
import { server } from "../server";
import { BookingModel } from "../models/bookings";
import { disconnect } from "mongoose";
import { getBookings } from "../services/booking";
const dbConnect = require("../connection")

dotenv.config()

describe("Login", () => {
    test("Return Authentication data required, when no email or password", async () => {
        const login = await supertest(app).post("/login").send({});
        expect({ status: 400, message: "Login failed or login data is missing, try again"})
    }),
    test("Login OK when email and password are correct", async () => {
      const response = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
      const token = process.env.TOKEN
      expect({ message: "loggin successful", token })
  })
})

describe("GET /bookings", () => {
    test("Returns No auth header because its not logged.", async () => {
      const login = await supertest(app).get("/bookings");
      expect(login.body).toEqual({ error: true, message: "No auth header"});
    }),
    test("Returns all data from section, authentication OK", async () =>{
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
      const token = login.body.token;
      const bookingsResponse = await supertest(app).get("/bookings").set("Authorization", `Bearer ${token}`);
      expect(bookingsResponse.body.allBookings).toBeInstanceOf(Array);
      expect(bookingsResponse.status).toBe(200);
    }),
    test("Returns data from id selected, authentication OK", async () =>{
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
      const token = login.body.token;
      const bookingsResponse = await supertest(app).get("/bookings/664f18c743b1d50939fab5d3").set("Authorization", `Bearer ${token}`);
      expect(bookingsResponse.body.individualBooking._id).toBe("664f18c743b1d50939fab5d3");
      expect(bookingsResponse.body.individualBooking).toBeInstanceOf(Object);
      expect(bookingsResponse.status).toBe(200);
    })
    /*test("Returns booking with id 20 not found", async () => {
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
      const token = login.body.token;
      const bookingsResponse = await supertest(app).get("/bookings/20").set("Authorization", `Bearer ${token}`);
      expect(bookingsResponse.status).toBe(404)
    })*/
}
)

describe("POST /bookings", () => {
  test("Returns Booking added successfully when adding a booking", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
    const token = login.body.token;
    const booking = {
      "first_name": "Pablo",
      "last_name": "Gonzalez",
      "order_date": "2024-02-01T03:23:01.862Z",
      "check_in": "2024-02-04T11:08:22.298Z",
      "check_inTime": "2024-03-22T07:04:40.597Z",
      "check_out": "2024-12-22T20:42:30.410Z",
      "check_OutTime": "2025-06-09T13:51:09.603Z",
      "booking_Time": "2025-06-07T15:01:57.056Z",
      "room_type": "Double Bed",
      "status": "Check In"
    }
    const request = await supertest(app).post("/bookings").send(booking).set("Authorization", `Bearer ${token}`);
    expect(request.body).toBe("Booking added successfully");
  })
})

describe("GET /rooms", () => {
    test("Returns No auth header because its not logged.", async () => {
      const login = await supertest(app).get("/rooms");
      expect(login.body).toEqual({ error: true, message: "No auth header"});
    }),
    test("Returns all data from section, authentication OK", async () =>{
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
      const token = login.body.token;
      const roomResponse = await supertest(app).get("/rooms").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body.allRooms).toBeInstanceOf(Array);
      expect(roomResponse.status).toBe(200)
    }),
    test("Returns data from id selected, authentication OK", async () =>{
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
      const token = login.body.token;
      const roomResponse = await supertest(app).get("/rooms/664f18c743b1d50939fab5ee").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body.individualRoom._id).toBe("664f18c743b1d50939fab5ee");
      expect(roomResponse.body.individualRoom).toBeInstanceOf(Object);
      expect(roomResponse.status).toBe(200)
    })
    /*test("Returns room with id 20 not found", async () => {
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
      const token = login.body.token;
      const roomResponse = await supertest(app).get("/rooms/20").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body).toEqual({ message: "Room with id 20 not found"});
    })*/
})

describe("POST /rooms", () => {
  test("Returns Room added successfully when adding a room", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
    const token = login.body.token;
    const room = {
        "room_code": "Simple B-95398",
        "room_floor": "Floor A-1",
        "room_type": "Single Bed",
        "room_amenities": "Free Wifi, parking, bar & lounge",
        "room_rate": "$190",
        "room_status": "Available"
    }
    const request = await supertest(app).post("/rooms").send(room).set("Authorization", `Bearer ${token}`);
    expect(request.body).toBe("Room added successfully");
  })
})

describe("GET /customer-reviews", () => {
    test("Returns No auth header because its not logged.", async () => {
      const login = await supertest(app).get("/customer-reviews");
      expect(login.body).toEqual({ error: true, message: "No auth header"});
    }),
    test("Returns all data from section, authentication OK", async () =>{
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
      const token = login.body.token;
      const reviewsResponse = await supertest(app).get("/customer-reviews").set("Authorization", `Bearer ${token}`);
      expect(reviewsResponse.body.allReviews).toBeInstanceOf(Array);
      expect(reviewsResponse.status).toBe(200);
    }),
    test("Returns data from id selected, authentication OK", async () =>{
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
      const token = login.body.token;
      const reviewsResponse = await supertest(app).get("/customer-reviews/664f18c743b1d50939fab5e3").set("Authorization", `Bearer ${token}`);
      expect(reviewsResponse.body.individualReview._id).toBe("664f18c743b1d50939fab5e3");
      expect(reviewsResponse.body.individualReview).toBeInstanceOf(Object);
      expect(reviewsResponse.status).toBe(200);
    })
    /*test("Returns room with id 20 not found", async () => {
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
      const token = login.body.token;
      const reviewsResponse = await supertest(app).get("/customer-reviews/20").set("Authorization", `Bearer ${token}`);
      expect(reviewsResponse.body).toEqual({ message: "Review with id 20 not found"});
    })*/
})

describe("GET /employees", () => {
    test("Returns No auth header because its not logged.", async () => {
      const login = await supertest(app).get("/employees");
      expect(login.body).toEqual({ error: true, message: "No auth header"});
    }),
    test("Returns all data from section, authentication OK", async () =>{
        const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
        const token = login.body.token;
        const usersResponse = await supertest(app).get("/employees").set("Authorization", `Bearer ${token}`);
        expect(usersResponse.body.allUsers).toBeInstanceOf(Array);
        expect(usersResponse.status).toBe(200)
    }),
    test("Returns data from id selected, authentication OK", async () =>{
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
      const token = login.body.token;
      const usersResponse = await supertest(app).get("/employees/664f18c743b1d50939fab5f9").set("Authorization", `Bearer ${token}`);
      expect(usersResponse.body.individualUser._id).toBe("664f18c743b1d50939fab5f9");
      expect(usersResponse.body.individualUser).toBeInstanceOf(Object);
      expect(usersResponse.status).toBe(200)
    })
    /*test("Returns room with id 20 not found", async () => {
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
      const token = login.body.token;
      const usersResponse = await supertest(app).get("/employees/20").set("Authorization", `Bearer ${token}`);
      expect(usersResponse.body).toEqual({ message: "User with id 20 not found"});
    })*/
})

describe("POST /employees", () => {
  test("Returns Employee added successfully when adding a employee", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "759435522024"});
    const token = login.body.token;
    const employee = {
      "employee_fullName": "Juan Alberto",
      "employee_email": "naomihagenes_marquardt@hotelmiranda.com",
      "employee_password": "$2b$10$.raMDy460IWgEStGpcLj3OTEl4H.59biBluP9ocgWwSkSiBR1Xw1q",
      "employee_startDate": "2024-06-13T16:08:56.791Z",
      "employee_description": "Senior Quality Engineer",
      "employee_phone": "(983) 431-0264",
      "employee_status": "Active"
    }
    const request = await supertest(app).post("/employees").send(employee).set("Authorization", `Bearer ${token}`);
    expect(request.body).toBe("Employee added successfully");
  })
})

afterAll(() => {server.close(), disconnect()})
