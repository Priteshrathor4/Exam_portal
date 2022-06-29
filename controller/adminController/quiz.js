const client = require('../../databaseCon')
const insert = require('../../insertData')

//show page
const quiz = (req, res) => {
        sess = req.session
        if (sess.userId && sess.admin) {
            client.query('SELECT * from "que2" ORDER BY id ASC ', (err, result) => {
                if (!err) {
                    // console.log(result.rows);
                    res.render('quiz-table', { que2: result.rows, success: req.flash('success'), error: req.flash('error'), info: req.flash('info') })
                } else {
                    console.log(err.stack);
                }
            })
        } else {
            res.redirect('/')
        }


    }
    //Quiz Add
const quizAdd = (req, res) => {
    let addque = req.body;
    client.query('SELECT question from "que2" WHERE question =$1', [addque.question], (err, r) => {
        if (err) throw err
        if (r.rows.length == 0) {
            insert.insertQue(addque.question, addque.opt1, addque.opt2, addque.opt3, addque.opt4, addque.answer, addque.exam).then(result => {
                if (result) {
                    req.flash('success', 'Quiz successfully Added');
                    console.log('quiz inserted');
                    res.redirect('/quiz_table')
                } else {
                    console.log('error')
                }
            });
        } else {
            req.flash('error', 'Quiz already exists!');
            res.redirect('/quiz_table')
        }
    })
    console.log(addque);
}


// update quiz
const quizUpdate = function(req, res) {
    let b = req.body
    console.log(req.body)
    console.log(req.params.id);
    client.query('UPDATE "que2" SET question = $1,optiona=$2,optionb=$3, optionc=$4, optiond=$5, answer=$6, language=$7 WHERE id =$8', [b.question, b.opt1, b.opt2, b.opt3, b.opt4, b.answer, b.exam, req.params.id], (err, result) => {
        if (!err) {
            console.log(result.rows);
            req.flash('info', 'Quiz successfully Updated');
            res.redirect('/quiz_table')
        } else {
            console.log(err.stack);
        }
    })
}

//delete quiz
const quizDelete = function(req, res) {

    console.log(req.params.id);
    client.query('DELETE from "que2" where id = $1', [req.params.id], (err, result) => {
        if (!err) {
            // console.log(result.rows);
            req.flash('error', 'Quiz successfully deleted');
            res.redirect('/quiz_table')
        } else {
            console.log(err.stack);
        }
    })
}

module.exports = { quiz: quiz, quizAdd: quizAdd, quizUpdate: quizUpdate, quizDelete: quizDelete }