const { Pool, Client, Query } = require("pg");
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "Exam",
    password: "pritesh123",
    port: 5432,
})

client.on("connect", () => {
    console.log("Database connected")
})

client.on("end", () => {
    console.log("Database connection end")
})
client.connect()
module.exports = client;