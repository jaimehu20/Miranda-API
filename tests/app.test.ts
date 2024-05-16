import supertest from "supertest";
import dotenv from "dotenv"
import { app } from "../app";
import { data as BookingData } from "../data/OrderData";
import { data as RoomData } from "../data/RoomsList";
import { data as CustomerData } from "../data/CustomerData";
import { data as UserData } from "../data/EmployeeData";
import { server } from "../server";


dotenv.config()

describe("Login", () => {
    test("Return Authentication data required, when no email or password", async () => {
        const response = await supertest(app).post("/login").send({});
        expect({ status: 511, message: "Authentication data required"})
    }),
    test("Login OK when email and password are correct", async () => {
      const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password:"1234"});
      const token = process.env.TOKEN
      expect({ message: "loggin successful", token })
  })
})

describe("GET /bookings", () => {
    test("Returns No auth header because its not logged.", async () => {
      const response = await supertest(app).get("/bookings");
      expect(response.body).toEqual({ error: true, message: "No auth header"});
    }),
    test("Returns all data from section, authentication OK", async () =>{
      const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password: "1234"});
      const token = response.body.token;
      const roomResponse = await supertest(app).get("/bookings").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body).toEqual(BookingData);
    }),
    test("Returns data from id selected, authentication OK", async () =>{
      const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password: "1234"});
      const token = response.body.token;
      const roomResponse = await supertest(app).get("/bookings/2").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body).toEqual(BookingData[1]);
    }),
    test("Returns booking with id 20 not found", async () => {
      const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password: "1234"});
      const token = response.body.token;
      const roomResponse = await supertest(app).get("/bookings/20").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body).toEqual({ message: "Booking with id 20 not found"});
    })
  })

describe("GET /rooms", () => {
    test("Returns No auth header because its not logged.", async () => {
      const response = await supertest(app).get("/rooms");
      expect(response.body).toEqual({ error: true, message: "No auth header"});
    }),
    test("Returns all data from section, authentication OK", async () =>{
      const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password: "1234"});
      const token = response.body.token;
      const roomResponse = await supertest(app).get("/rooms").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body).toEqual(RoomData);
    }),
    test("Returns data from id selected, authentication OK", async () =>{
      const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password: "1234"});
      const token = response.body.token;
      const roomResponse = await supertest(app).get("/rooms/110319680").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body).toEqual(RoomData[1]);
    }),
    test("Returns room with id 20 not found", async () => {
      const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password: "1234"});
      const token = response.body.token;
      const roomResponse = await supertest(app).get("/rooms/20").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body).toEqual({ message: "Room with id 20 not found"});
    })
})

describe("GET /customer-reviews", () => {
    test("Returns No auth header because its not logged.", async () => {
      const response = await supertest(app).get("/customer-reviews");
      expect(response.body).toEqual({ error: true, message: "No auth header"});
    }),
    test("Returns all data from section, authentication OK", async () =>{
      const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password: "1234"});
      const token = response.body.token;
      const roomResponse = await supertest(app).get("/customer-reviews").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body).toEqual(CustomerData);
    }),
    test("Returns data from id selected, authentication OK", async () =>{
      const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password: "1234"});
      const token = response.body.token;
      const roomResponse = await supertest(app).get("/customer-reviews/89").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body).toEqual(CustomerData[1]);
    }),
    test("Returns room with id 20 not found", async () => {
      const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password: "1234"});
      const token = response.body.token;
      const roomResponse = await supertest(app).get("/customer-reviews/20").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body).toEqual({ message: "Review with id 20 not found"});
    })
})

describe("GET /users", () => {
    test("Returns No auth header because its not logged.", async () => {
      const response = await supertest(app).get("/users");
      expect(response.body).toEqual({ error: true, message: "No auth header"});
    }),
    test("Returns all data from section, authentication OK", async () =>{
        const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password: "1234"});
        const token = response.body.token;
        const roomResponse = await supertest(app).get("/users").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.body).toEqual(UserData);
    }),
    test("Returns data from id selected, authentication OK", async () =>{
      const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password: "1234"});
      const token = response.body.token;
      const roomResponse = await supertest(app).get("/users/6705").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body).toEqual(UserData[1]);
    }),
    test("Returns room with id 20 not found", async () => {
      const response = await supertest(app).post("/login").send({email: "admin@hotelmiranda.com", password: "1234"});
      const token = response.body.token;
      const roomResponse = await supertest(app).get("/users/20").set("Authorization", `Bearer ${token}`);
      expect(roomResponse.body).toEqual({ message: "User with id 20 not found"});
    })
})

afterAll(() => {server.close()})