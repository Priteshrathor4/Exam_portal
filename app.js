const authRoute = require('./controller/authRoute')
const termRoute = require('./controller/terms')
const queRoute = require('./controller/queRoute')
const adminRoute = require('./controller/adminController/admin')
const userRoute = require('./controller/adminController/user')
const ruleRoute = require('./controller/adminController/rules')
const quizRoute = require('./controller/adminController/quiz')
const resultRoute = require('./controller/adminController/result')
const submitRoute = require('./controller/submitRoute')
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
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


////// ------START FILE RENDER---------//////
app.get('/', function(req, res) {
    res.render('index', { error: req.flash('error'), success: req.flash('success'), errorSignup: req.flash('errorSignup') })

});

////// ------AUTH ROUTE ---------//////
app.post('/userPost', authRoute.register)
app.post('/loginPost', authRoute.login)

////// ------FOR TERMS GET---------//////
app.get('/terms', termRoute.terms);

////// ------FOR GET QUESTION AS PER SELECTED EXAM ---------//////
app.get('/question:id', queRoute.question);

////// ------THANK YOU PAGE ---------//////
app.post('/submitPost', submitRoute.submit);

////// ------ADMIN ROUTES---------//////
app.get('/admin', adminRoute.admin);

////// ------USER ROUTES ---------//////
app.get('/user', userRoute.user);
app.post('/addUser', userRoute.userAdd);
app.post('/user_update/:id', userRoute.userUpdate);
app.get('/user/:id', userRoute.userDelete);


////// ------RULES ROUTES---------//////
app.get('/rules', ruleRoute.rule);
app.post('/rulpost', ruleRoute.ruleAdd);
app.post('/ruleUpdate/:id', ruleRoute.ruleUpdate);
app.get('/rule/:id', ruleRoute.ruleDelete);

////// ------QUIZ ROUTE ---------//////
app.get('/quiz_table', quizRoute.quiz);
app.post('/quiz', quizRoute.quizAdd);
app.post('/quizUpdate/:id', quizRoute.quizUpdate);
app.get('/quiz/:id', quizRoute.quizDelete);


////// ------RESULT ROUTE ---------//////
app.get('/result', resultRoute.result);

////----------Logout------------///
app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log('logout')
    res.redirect('/')
})



////// ------LISTEN PORT---------//////
app.listen(port);
console.log('Server started at http://localhost:' + port);