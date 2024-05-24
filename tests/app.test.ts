import supertest from "supertest";
import dotenv from "dotenv"
import { app } from "../app";
import { server } from "../server";
import { disconnect } from "mongoose";
const dbConnect = require("../connection")

dotenv.config()

describe("Login", () => {
    test("Return Authentication data required, when no email or password", async () => {
        const login = await supertest(app).post("/login").send({});
        expect({ status: 400, message: "Login failed or login data is missing, try again"})
    }),
    test("Login OK when email and password are correct", async () => {
      const response = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
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
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
      const token = login.body.token;
      const bookingsResponse = await supertest(app).get("/bookings").set("Authorization", `Bearer ${token}`);
      expect(bookingsResponse.body.allBookings).toBeInstanceOf(Array);
      expect(bookingsResponse.status).toBe(200);
    }),
    test("Returns data from id selected, authentication OK", async () =>{
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
      const token = login.body.token;
      const bookingsResponse = await supertest(app).get("/bookings/66504c4c0f45e3b477af478a").set("Authorization", `Bearer ${token}`);
      expect(bookingsResponse.body.individualBooking._id).toBe("66504c4c0f45e3b477af478a");
      expect(bookingsResponse.body.individualBooking).toBeInstanceOf(Object);
      expect(bookingsResponse.status).toBe(200);
    }),
    test("Returns Invalid booking ID when ID is not found", async () => {
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
      const token = login.body.token;
      const bookingsResponse = await supertest(app).get("/bookings/66504c4c0f45e3b479af4792").set("Authorization", `Bearer ${token}`);
      expect(bookingsResponse.body).toEqual({ message: "Invalid booking ID"});
    }),
    test("Returns status 400 when ID format is not correct", async () => {
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
      const token = login.body.token;
      const bookingsResponse = await supertest(app).get("/bookings/20").set("Authorization", `Bearer ${token}`);
      expect(bookingsResponse.status).toBe(400)
    })
}
)

describe("POST /bookings", () => {
  test("Returns Booking added successfully when adding a booking", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const booking = {
        "first_name": "Miguel",
        "last_name": "Ortega",
        "order_date": "2024-01-02T07:24:12.304Z",
        "check_in": "2024-01-04T17:44:56.002Z",
        "check_inTime": "2025-03-10T12:40:15.996Z",
        "check_out": "2024-09-07T08:48:47.054Z",
        "check_OutTime": "2024-09-06T18:28:06.453Z",
        "booking_Time": "2023-07-14T06:12:07.646Z",
        "room_type": "Double Bed Superior",
        "status": "Check In"
    }
    const request = await supertest(app).post("/bookings").send(booking).set("Authorization", `Bearer ${token}`);
    expect(request.body).toEqual({message: "Booking added successfully"});
  })
})

describe("DELETE /bookings", () => {
  test("Returns Booking with id 66504c4c0f45e3b477af478b deleted successfully when deleting a booking", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const request = await supertest(app).delete("/bookings/66504c4c0f45e3b477af478b").set("Authorization", `Bearer ${token}`);
    expect(request.body).toEqual({message: "Booking with id 66504c4c0f45e3b477af478b deleted successfully"});
  })
})

describe("PATCH /bookings", () => {
  test("Returns Booking with id 66504c4c0f45e3b477af478c updated successfully when updating a booking", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const request = await supertest(app).patch("/bookings/66504c4c0f45e3b477af478c").send({"first_name": "Juan Alberto"}).set("Authorization", `Bearer ${token}`);
    expect(request.body).toEqual({message: "Booking with id 66504c4c0f45e3b477af478c updated successfully"});
  })
})

describe("GET /rooms", () => {
  test("Returns No auth header because its not logged.", async () => {
    const login = await supertest(app).get("/rooms");
    expect(login.body).toEqual({ error: true, message: "No auth header"});
  }),
  test("Returns all data from section, authentication OK", async () =>{
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const roomResponse = await supertest(app).get("/rooms").set("Authorization", `Bearer ${token}`);
    expect(roomResponse.body.allRooms).toBeInstanceOf(Array);
    expect(roomResponse.status).toBe(200)
  }),
  test("Returns data from id selected, authentication OK", async () =>{
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const roomResponse = await supertest(app).get("/rooms/66504c4d0f45e3b477af47a5").set("Authorization", `Bearer ${token}`);
    expect(roomResponse.body.individualRoom._id).toBe("66504c4d0f45e3b477af47a5");
    expect(roomResponse.body.individualRoom).toBeInstanceOf(Object);
    expect(roomResponse.status).toBe(200)
  }),
  test("Returns Invalid room ID when ID is not found", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const bookingsResponse = await supertest(app).get("/rooms/66504c4d0f45e3b477af11a5").set("Authorization", `Bearer ${token}`);
    expect(bookingsResponse.body).toEqual({ message: "Invalid room ID"});
  }),
  test("Returns status 400 when ID format is not correct", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const bookingsResponse = await supertest(app).get("/rooms/20").set("Authorization", `Bearer ${token}`);
    expect(bookingsResponse.status).toBe(400)
  })
})

describe("POST /rooms", () => {
  test("Returns Room added successfully when adding a room", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
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
    expect(request.body).toEqual({message: "Room added successfully"});
  })
})

describe("DELETE /rooms", () => {
  test("Returns Room with id 66504c4d0f45e3b477af47a6 deleted successfully when deleting a room", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const request = await supertest(app).delete("/rooms/66504c4d0f45e3b477af47a6").set("Authorization", `Bearer ${token}`);
    expect(request.body).toEqual({message: "Room with id 66504c4d0f45e3b477af47a6 deleted successfully"});
  })
})

describe("PATCH /rooms", () => {
  test("Returns Room with id 66504c4d0f45e3b477af47a7 updated successfully", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const request = await supertest(app).patch("/rooms/66504c4d0f45e3b477af47a7").send({"room_code": "A-95398"}).set("Authorization", `Bearer ${token}`);
    expect(request.body).toEqual({message: "Room with id 66504c4d0f45e3b477af47a7 updated successfully"});
  })
})

describe("GET /customer-reviews", () => {
  test("Returns No auth header because its not logged.", async () => {
    const login = await supertest(app).get("/customer-reviews");
    expect(login.body).toEqual({ error: true, message: "No auth header"});
  }),
  test("Returns all data from section, authentication OK", async () =>{
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const reviewsResponse = await supertest(app).get("/customer-reviews").set("Authorization", `Bearer ${token}`);
    expect(reviewsResponse.body.allReviews).toBeInstanceOf(Array);
    expect(reviewsResponse.status).toBe(200);
  }),
  test("Returns data from id selected, authentication OK", async () =>{
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const reviewsResponse = await supertest(app).get("/customer-reviews/66504c4c0f45e3b477af479a").set("Authorization", `Bearer ${token}`);
    expect(reviewsResponse.body.individualReview._id).toBe("66504c4c0f45e3b477af479a");
    expect(reviewsResponse.body.individualReview).toBeInstanceOf(Object);
    expect(reviewsResponse.status).toBe(200);
  }),
  test("Returns Invalid review ID when ID is not found", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const bookingsResponse = await supertest(app).get("/customer-reviews/66504c4d0f45e3b477af11a5").set("Authorization", `Bearer ${token}`);
    expect(bookingsResponse.body).toEqual({ message: "Invalid review ID"});
  }),
  test("Returns status 400 when ID format is not correct", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const bookingsResponse = await supertest(app).get("/customer-reviews/20").set("Authorization", `Bearer ${token}`);
    expect(bookingsResponse.status).toBe(400)
  })
})

describe("GET /employees", () => {
  test("Returns No auth header because its not logged.", async () => {
    const login = await supertest(app).get("/employees");
    expect(login.body).toEqual({ error: true, message: "No auth header"});
  }),
  test("Returns all data from section, authentication OK", async () =>{
      const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
      const token = login.body.token;
      const usersResponse = await supertest(app).get("/employees").set("Authorization", `Bearer ${token}`);
      expect(usersResponse.body.allUsers).toBeInstanceOf(Array);
      expect(usersResponse.status).toBe(200)
  }),
  test("Returns data from id selected, authentication OK", async () =>{
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const usersResponse = await supertest(app).get("/employees/66504c4d0f45e3b477af47b0").set("Authorization", `Bearer ${token}`);
    expect(usersResponse.body.individualUser._id).toBe("66504c4d0f45e3b477af47b0");
    expect(usersResponse.body.individualUser).toBeInstanceOf(Object);
    expect(usersResponse.status).toBe(200)
  }),
  test("Returns Invalid employee ID when ID is not found", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const bookingsResponse = await supertest(app).get("/employees/66504c4d0f45e3b477af11a5").set("Authorization", `Bearer ${token}`);
    expect(bookingsResponse.body).toEqual({ message: "Invalid employee ID"});
  }),
  test("Returns status 400 when ID format is not correct", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const bookingsResponse = await supertest(app).get("/employees/20").set("Authorization", `Bearer ${token}`);
    expect(bookingsResponse.status).toBe(400)
  })
})

describe("POST /employees", () => {
  test("Returns Employee added successfully when adding a employee", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
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
    expect(request.body).toEqual({message: "Employee added successfully"});
  })
})

describe("DELETE /employees", () => {
  test("Returns Employee with id 66504c4d0f45e3b477af47b1 deleted successfully", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const request = await supertest(app).delete("/employees/66504c4d0f45e3b477af47b1").set("Authorization", `Bearer ${token}`);
    expect(request.body).toEqual({message: "Employee with id 66504c4d0f45e3b477af47b1 deleted successfully"});
  })
})

describe("PATCH /employees", () => {
  test("Returns Employee with id 66504c4d0f45e3b477af47b2 updated successfully", async () => {
    const login = await supertest(app).post("/login").send({email: "jaimehu20@hotelmiranda.com", password: "jaimehu20@co"});
    const token = login.body.token;
    const request = await supertest(app).patch("/employees/66504c4d0f45e3b477af47b2").send({"employee_fullName": "Miguel Angel Benítez"}).set("Authorization", `Bearer ${token}`);
    expect(request.body).toEqual({message: "Employee with id 66504c4d0f45e3b477af47b2 updated successfully"});
  })
})



afterAll(() => {server.close(), disconnect()})
