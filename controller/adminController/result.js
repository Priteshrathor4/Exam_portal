const client = require('../../databaseCon')


const result = (req, res) => {

    sess = req.session
    if (sess.userId && sess.admin) {
        client.query('SELECT * from "result" ORDER BY id ASC ', (err, result) => {
            if (!err) {

                res.render('result', { result: result.rows })
            } else {
                console.log(err.stack);
            }
        })
    } else {
        res.redirect('/')
    }

}

module.exports = { result: result }