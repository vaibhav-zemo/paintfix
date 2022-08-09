const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;
const path = require('path');

const expresslayout = require('express-ejs-layouts');
const mongodb = require('./config/mongoose');
const user = require('./models/user');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customWare = require('./config/middleware');



// View 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// Parser
app.use(express.urlencoded());

// Assets
app.use(express.static('assets'));

app.use(expresslayout);
app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(session({
    name: 'paintfix',
    secret: "aosdnosdnf",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb+srv://vaibhavpathak:pathakvaibhav@cluster0.8lyrlym.mongodb.net/paintfix?retryWrites=true&w=majority',
            mongooseConnection: mongodb,
            autoRemove: 'disabled'
        }, function (err) {
            console.log(err || 'connect-mongo');
        })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customWare.setFlash);

// Router
app.use('/',require('./routers'));

// Listen
app.listen(port, function (err) {
    if (err) {
        console.log("Error while creating server");
        return;
    }
    console.log("Server is running at port: ", port);
});