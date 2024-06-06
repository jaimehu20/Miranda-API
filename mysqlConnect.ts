import mysql from "mysql2"

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jaimehu20@co',
  database: 'hotelmirandadashboard'
});