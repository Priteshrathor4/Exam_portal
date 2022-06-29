const { Client } = require("pg");
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "exam",
    password: "svPatel#20",
    port: 5432,
    // user: 'vskcisevzglzdk',
    // host: 'ec2-34-231-63-30.compute-1.amazonaws.com',
    // database: 'dfv716h3lo3jhf',
    // password: '3b2fe11ba5be1458693c93f4529cf068f4ec5ccb22746824957413372386eadd',
    // port: 5432,
})

client.on("connect", () => {
    console.log("Database connected")
})

client.on("end", () => {
    console.log("Database connection end")
})
client.connect()
module.exports = client;