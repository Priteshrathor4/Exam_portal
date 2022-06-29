const client = require('./databaseCon');


const insertUser = async(name, email, username, password, qualification, bit) => {
    try {
        // await client.connect(); // gets connection
        await client.query(
            `INSERT INTO "user" ("name","email","username","password","qualification","bit")  
             VALUES ($1,$2,$3,$4,$5,$6)`, [name, email, username, password, qualification, bit]); // sends queries
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
const insertQue = async(question, optiona, optionb, optionc, optiond, answer, language) => {
    try {
        // gets connection
        await client.query(
            `INSERT INTO "que2" ("question","optiona","optionb","optionc","optiond","answer","language")  
             VALUES ($1,$2,$3,$4,$5,$6,$7)`, [question, optiona, optionb, optionc, optiond, answer, language]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

//Insert Result
const insertResult = async(name, email, subject, marks, sid) => {
    try {
        // gets connection
        await client.query(
            `INSERT INTO "result" ("name","email","subject","marks","sid")  
             VALUES ($1,$2,$3,$4,$5)`, [name, email, subject, marks, sid]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};


module.exports = { insertUser: insertUser, insertQue: insertQue, insertRule: insertRule, insertResult: insertResult };