require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

const connection = mongoose.connection
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
connection.on('connected', ()=>{
    console.log('a successful connection msg goes here')"
})
connection.on('error', (err)=>{
    console.log('failed to connect msg goes here: ' + err)"
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname, + '/client/build/'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})

module.exports = app;
