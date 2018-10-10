require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
const { Category, Vent } = require('./model') 


const potHoles = new Vent({
    description: 'The roads are in such bad conditions'
})


const Traffic = new Category({
    title: 'Traffic',
    vents: [potHoles]
})

Category.remove({})
  .then(() => Traffic.save())
  .then(() => console.log('Successful Save'))
  .then(() => mongoose.connection.close())