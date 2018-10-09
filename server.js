require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

const connection = mongoose.connection
mongoose.connect(
    process.env.MONGODB_URI, 
    { useNewUrlParser: true }
)
connection.on('connected', ()=>{
    console.log('Ready Player One')
})

connection.on('error', (err)=>{
    console.log('failed to connect: ' + err)
})

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(`${__dirname}/client/build/`))

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const categoryController = require('./routes/categoryController')
// const ventController = require('./routes/ventController')

app.use('/api/categories', categoryController)
// app.use('/api/category/:categoryId/vent', ventController)


module.exports = app