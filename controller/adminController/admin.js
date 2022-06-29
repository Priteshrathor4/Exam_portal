const client = require('../../databaseCon')
const admin = (req, res) => {
    sess = req.session
    if (sess.userId && sess.admin) {
        let query = 'SELECT COUNT(*) AS user_count FROM "user";SELECT COUNT(*) AS que_count FROM "que2";SELECT COUNT(*) AS rule_count FROM "rules";SELECT COUNT(*) FROM "que2" GROUP BY language ORDER BY language ASC'
        client.query(query, (err, result) => {
            let user_count = result[0].rows[0].user_count,
                que_count = result[1].rows[0].que_count,
                rule_count = result[2].rows[0].rule_count,
                language_count = result[3].rows;
            // html_count = result[3].rows[0].count,
            // css_count = result[3].rows[1].count,
            // js_count = result[3].rows[2].count
            // console.log(user_count + "-" + que_count + "-" + rule_count )
            // console.log(language_count)
            res.render('admin_index', { admin_success: req.flash('success'), user_count: user_count, que_count: que_count, rule_count: rule_count, language_count: language_count });
        });
    } else {
        res.redirect('/')
    }
}

module.exports = { admin: admin }