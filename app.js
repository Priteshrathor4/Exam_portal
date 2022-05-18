const insert = require('./insertData')
const express = require('express');
const client = require('./databaseCon');
const session = require('express-session');
const flash = require('connect-flash');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded());

///USE Express session
app.use(session({
    secret: 'SecretStringForSession',
    cookie: { maxAge: 60000 * 60 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

/// PUBLIC FOLDERS
app.use(express.static('public'));
app.use(express.static('Admin'));
app.set('view engine', 'ejs');


////// -----------------------START FILE RENDER--------------------------//////
app.get('/', function(req, res) {
    res.render('index', { error: req.flash('error'), success: req.flash('success'), errorSignup: req.flash('errorSignup') })

});

////// -----------------------FOR Register --------------------------//////
app.post('/userPost', (req, res) => {
    let d = req.body;
    client.query('SELECT email from "user" where email = $1', [d.email], (err, respons) => {
        if (!err) {
            if (respons.rows.length == 0) {
                insert.insertUser(d.name, d.email, d.username, d.password, d.exam, d.qualification, false).then(result => {
                    if (result) {
                        req.flash('success', 'User Scuccesfully Signed In');
                        console.log('User inserted');
                        res.redirect('/');
                    } else {
                        console.log('error')
                    }
                });
            } else {
                req.flash('errorSignup', 'Given Email Id alredy used.');
                console.log('user already existed');
                res.redirect('/')
            }
        } else {
            console.log(err)
        }
    })
})

////// -----------------------FOR LOG IN --------------------------//////
app.post('/loginPost', (req, res) => {
    client.query('SELECT email,password,bit,id from "user" where email = $1', [req.body.email], (err, result) => {
        if (!err) {
            if (result.rowCount > 0) {
                let r = result.rows[0];
                console.log(r.bit)
                if ((r.email == req.body.email) && (r.password == req.body.password)) {
                    let sess = req.session;
                    sess.userId = r.id
                    if (r.bit == true) {
                        console.log('admin logged')
                        sess.admin = r.bit
                        req.flash('success', 'Admin successfully loggedIn');
                        res.redirect('/admin')
                    } else {
                        console.log('login user')
                        req.flash('success', 'User successfully loggedIn');
                        res.redirect('/terms')
                    }
                } else {
                    console.log('invalid password ')
                    req.flash('error', 'Invalid password ');
                    res.redirect('/')
                }
            } else {
                req.flash('error', 'User not registered');
                console.log('user not registered')
                res.redirect('/')
            }
        } else {
            console.log(err.stack)
        }
    })
    console.log(req.body)

})

////// -----------------------FOR TERMS GET--------------------------//////
app.get('/terms', (req, res) => {
    sess = req.session
    if (sess.userId) {
        client.query('SELECT * from "rules"', (err, result) => {
            if (!err) {
                console.log(result.rows);
                let id = sess.userId;
                console.log(id)
                res.render('terms', { terms: result.rows, id: id, success: req.flash('success') })
            } else {
                console.log(err.stack);
            }
        })
    } else {
        res.redirect('/')
    }

});

////// -----------------------FOR GET QUESTION AS PER SELECTED EXAM --------------------------//////
app.get('/question:id', (req, res) => {
    sess = req.session
    if (sess.userId) {
        // console.log('yeah')
        console.log('id', req.params.id)
        client.query('SELECT * from "que2" where language = $1 limit 25', [req.params.id], (err, result) => {
            if (!err) {
                console.log(result.rows);
                res.render('question', { question: result.rows, id: req.params.id })
            } else {
                console.log(err.stack);
            }
        })
    } else {
        res.redirect('/')
    }

});

////// -----------------------THANK YOU PAGE --------------------------//////
app.get('/submit', (req, res) => {
    res.render('submit')
});
app.post('/submitPost', (req, res) => {
    res.redirect('submit')
});

////// -----------------------ADMIN ROUTES--------------------------//////
app.get('/admin', (req, res) => {
    sess = req.session
    if (sess.userId && sess.admin) {
        let query = 'SELECT COUNT(*) AS user_count FROM "user";SELECT COUNT(*) AS que_count FROM "que2";SELECT COUNT(*) AS rule_count FROM "rules"';
        client.query(query, (err, result) => {
            let user_count = result[0].rows[0].user_count,
                que_count = result[1].rows[0].que_count,
                rule_count = result[2].rows[0].rule_count
                // html_count = result[3].rows[0].count,
                // css_count = result[3].rows[1].count,
                // js_count = result[3].rows[2].count
                // console.log(user_count + "-" + que_count + "-" + rule_count )
                // console.log(language_count)
            res.render('admin_index', { admin_success: req.flash('success'), user_count: user_count, que_count: que_count, rule_count: rule_count })
        })

    } else {
        res.redirect('/')
    }
});

////// -----------------------USER TABLE --------------------------//////
app.get('/user', (req, res) => {
    sess = req.session
    if (sess.userId && sess.admin) {
        client.query('SELECT * from "user" where bit = $1 ORDER BY id ASC ', [false], (err, result) => {
            if (!err) {
                // console.log(result.rows);
                res.render('user-table', { user: result.rows, success: req.flash('success'), error: req.flash('error'), info: req.flash('info') })
            } else {
                console.log(err.stack);
            }
        })
    } else {
        res.redirect('/')
    }

});

////// -----------------------USER TABLE ADD USER--------------------------//////
app.post('/addUser', (req, res) => {
    let adduser = req.body;
    client.query('SELECT email from "user" where email = $1', [adduser.email], (err, respons) => {
        if (!err) {
            if (respons.rows.length == 0) {
                insert.insertUser(adduser.name, adduser.email, adduser.username, adduser.password, adduser.exam, adduser.qualification, false).then(result => {
                    if (result) {
                        console.log('User inserted');
                        req.flash('success', 'User successfully Added');
                        res.redirect('/user')
                    } else {
                        console.log('error')
                    }
                });
            } else {
                console.log('user already existed');
                req.flash('error', 'User already existed');
                res.redirect('/user')
            }
        } else {
            console.log(err)
        }
    })
});

////// -----------------------USER TABLE UPDATE USER --------------------------//////
app.post('/user_update/:id', function(req, res) {
    let v = req.body;
    console.log(v.email)
    client.query('UPDATE "user" SET name = $1, email=$2, username=$3,password=$4,qualification=$5 WHERE id =$6', [v.name, v.email, v.username, v.password, v.qualification, req.params.id], (err, result) => {
        if (!err) {
            req.flash('info', 'User updated Successfully!');
            console.log('user updated');
            res.redirect('/user')
        } else {
            console.log(err.stack);
        }
    })
});

////// -----------------------USER TABLE DELETE USER --------------------------//////
app.get('/user/:id', function(req, res) {

    console.log(req.params.id);
    client.query('DELETE from "user" where id = $1', [req.params.id], (err, result) => {
        if (!err) {
            // console.log(result.rows);
            req.flash('error', 'User successfully deleted');
            res.redirect('/user')
        } else {
            console.log(err.stack);
        }
    })

});


////// -----------------------RULES TABLE --------------------------//////
app.get('/rules', (req, res) => {
    sess = req.session
    if (sess.userId && sess.admin) {
        client.query('SELECT * from "rules" ORDER BY id ASC ', (err, result) => {
            if (!err) {
                // console.log(result.rows);
                res.render('user_rules', { rules: result.rows, success: req.flash('success'), error: req.flash('error'), info: req.flash('info') })
            } else {
                console.log(err.stack);
            }
        })
    } else { res.redirect('/') }

});

////// -----------------------RULES TABLE ADD RULES --------------------------//////
app.post('/rulpost', (req, res) => {
    let addrules = req.body;
    insert.insertRule(addrules.rule).then(result => {
        if (result) {
            console.log('rulpost inserted');
            req.flash('success', 'Quiz successfully Added');
            res.redirect('/rules')
        } else {
            console.log('error')
        }
    });
    console.log(addrules);
});

////// -----------------------RULES TABLE UPDATE RULES --------------------------//////
app.post('/ruleUpdate/:id', function(req, res) {
    console.log(req.body.rule)
    console.log(req.params.id);
    client.query('UPDATE "rules" SET rules = $1 WHERE id =$2', [req.body.rule, req.params.id], (err, result) => {
        if (!err) {
            console.log(result.rows);
            req.flash('info', 'Quiz successfully Updated');
            res.redirect('/rules')
        } else {
            console.log(err.stack);
        }
    })

});

////// -----------------------RULES TABLE DELETE RULES --------------------------//////
app.get('/rule/:id', function(req, res) {

    console.log(req.params.id);
    client.query('DELETE from "rules" where id = $1', [req.params.id], (err, result) => {
        if (!err) {
            // console.log(result.rows);
            req.flash('error', 'Quiz successfully deleted');
            res.redirect('/rules')
        } else {
            console.log(err.stack);
        }
    })

});

////// -----------------------QUIZ TABLE --------------------------//////
app.get('/quiz_table', (req, res) => {
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


});

////// -----------------------QUIZ TABLE ADD QUIZ--------------------------//////
app.post('/quiz', (req, res) => {
    let addque = req.body;
    client.query('SELECT question from "que2" WHERE question =$1', [addque.question], (err, r) => {
        if (err) throw err
        if (r.rows.length == 0) {
            insert.insertQue(addque.question, addque.opt1, addque.opt2, addque.opt3, addque.opt4, addque.exam).then(result => {
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
});

////// -----------------------QUIZ TABLE UPDATE QUIZ--------------------------//////
app.post('/quizUpdate/:id', function(req, res) {
    let b = req.body
    console.log(req.body)
    console.log(req.params.id);
    client.query('UPDATE "que2" SET question = $1,optiona=$2,optionb=$3, optionc=$4, optiond=$5, language=$6 WHERE id =$7', [b.question, b.opt1, b.opt2, b.opt3, b.opt4, b.exam, req.params.id], (err, result) => {
        if (!err) {
            console.log(result.rows);
            req.flash('info', 'Quiz successfully Updated');
            res.redirect('/quiz_table')
        } else {
            console.log(err.stack);
        }
    })
});

////// -----------------------QUIZ TABLE DELETE QUIZ--------------------------//////
app.get('/quiz/:id', function(req, res) {

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
});

/////////////////------------------Logout-----------------------------------///////////
app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log('logout')
    res.redirect('/')
})



////// -----------------------LISTEN PORT--------------------------//////
app.listen(port);
console.log('Server started at http://localhost:' + port);