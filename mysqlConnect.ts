import mysql from "mysql2"

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jaimehu20@co',
  database: 'hotelmirandadashboard'
});

connection.query(
    'CREATE TABLE bookings (booking_id int primary key auto_increment, first_name varchar(10), last_name varchar(20), order_date varchar(10), check_in varchar(10), check_inTime varchar(10), check_out varchar(10), check_OutTime varchar(10), booking_time varchar(10), room_type varchar(10), status varchar(10))'
)

connection.query(
    'CREATE TABLE rooms (room_id int primary key auto_increment, room_code varchar(10), room_floor varchar(10), room_type varchar(10), room_amenities varchar(50), room_rate int, room_status varchar(10))'
)

connection.query(
    'CREATE TABLE employees (employee_id int primary key auto_increment, employee_fullName varchar(20), employee_email varchar(25), employee_password varchar(255), employee_startDate varchar(10), employee_description varchar(10), employee_phone varchar(10), employee_status varchar(10))'
)

connection.query(
    'CREATE TABLE reviews (review_id int primary key auto_increment, review_date varchar(10), review_time varchar(10), review_customer varchar(15), review_customerMail varchar(20), review_customerPhone varchar(10), review_comment varchar(10))'
)

connection.end()