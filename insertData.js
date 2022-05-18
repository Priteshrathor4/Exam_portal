const client = require('./databaseCon');


const insertUser = async(name, email, username, password, exam, qualification, bit) => {
    try {
        // await client.connect(); // gets connection
        await client.query(
            `INSERT INTO "user" ("name","email","username","password","exam","qualification","bit")  
             VALUES ($1,$2,$3,$4,$5,$6,$7)`, [name, email, username, password, exam, qualification, bit]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

// for rules table
const insertRule = async(rules) => {
    try {
        // gets connection
        await client.query(
            `INSERT INTO "rules" ("rules")  
             VALUES ($1)`, [rules]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};


//Insert Question
const insertQue = async(question, optiona, optionb, optionc, optiond, language) => {
    try {
        // gets connection
        await client.query(
            `INSERT INTO "que2" ("question","optiona","optionb","optionc","optiond","language")  
             VALUES ($1,$2,$3,$4,$5,$6)`, [question, optiona, optionb, optionc, optiond, language]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};


module.exports = { insertUser: insertUser, insertQue: insertQue, insertRule: insertRule };