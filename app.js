var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var validation = require('express-validator');
var cors = require('cors')
var passport = require('passport')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');
var config = require('./config')

mongoose.connect(config.dbConnectString, {
    auth: {
        user: 'long',
        password: "T@m123456"
    },
    useNewUrlParser: true
}).then( () => console.log('connect db seccess'));


global.User = require('./models/user')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./passport')
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validation())
app.use(cors())

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client-view/build'))
    app.get('*', (req, res) => {
        console.log("dsfs");
        res.sendFile(path.resolve(__dirname + '/../client-view' , 'build', 'index.html'))
    })
}

// app.use('/', indexRouter);
app.use('/api/users', usersRouter);
module.exports = app;


