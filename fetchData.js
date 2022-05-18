const { response } = require('express');
const client = require('./databaseCon');


(async() => {
    // await client.connect();

    client.query('select * from "user"', (err, respose) => {
        if (!err) {
            console.log(respose.rows);
        } else {
            console.log(err)
        }
        // client.end();
    })
})();