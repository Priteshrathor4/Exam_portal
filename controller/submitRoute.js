const insert = require('../insertData');
const client = require('../databaseCon');


const submit = (req, res) => {

    console.log(`submit  ${req.body}`)
    sess = req.session
    right_answer = sess.answer;
    console.log(right_answer)
    marks = 0;
    user_answer = Object.values(req.body)
    console.log(user_answer)
    console.log(right_answer)
    for (let i = 0; i < user_answer.length; i++) {
        if (user_answer[i] == right_answer[i]) {
            marks = marks + 1;
        }

    }

    client.query('SELECT name,email FROM "user" WHERE id = $1', [sess.userId], (err, result) => {
        if (!err) {
            let name = result.rows[0].name,
                email = result.rows[0].email,
                sid = sess.userId,
                subject = sess.subject;
            client.query('SELECT name,email FROM "result" WHERE sid = $1 AND subject=$2', [sess.userId, sess.subject], (err, result1) => {
                if (!err) {

                    if (result1.rows.length > 0) {
                        client.query('UPDATE "result" SET marks=$2 WHERE sid = $1 AND subject = $3 ', [sess.userId, marks, subject], (err, result) => {
                            if (!err) {
                                console.log('result update')
                                if (sess.userId) {
                                    res.render('submit', { marks: marks, subject: subject })
                                } else {
                                    res.redirect('/')
                                }
                            }
                        })
                    } else {
                        insert.insertResult(name, email, subject, marks, sid).then(result2 => {
                            if (result2) {
                                console.log('result inserted')
                                if (sess.userId) {
                                    res.render('submit', { marks: marks, subject: subject })
                                } else {
                                    res.redirect('/')
                                }
                            }
                        })
                    }
                } else {
                    console.log(err.stack)
                }
            })

        }
    })
}

module.exports = { submit: submit }