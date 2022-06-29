const client = require('../../databaseCon')
const insert = require('../../insertData')

const user = (req, res) => {
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

}

const userAdd = (req, res) => {
    let adduser = req.body;
    client.query('SELECT email from "user" where email = $1', [adduser.email], (err, respons) => {
        if (!err) {
            if (respons.rows.length == 0) {
                insert.insertUser(adduser.name, adduser.email, adduser.username, adduser.password, adduser.qualification, false).then(result => {
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
}

const userUpdate = function(req, res) {
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
}

const userDelete = function(req, res) {

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

}



module.exports = { user: user, userAdd: userAdd, userUpdate: userUpdate, userDelete: userDelete }