require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
const { Category, Vent } = require('./model') 


const potHoles = new Vent({
    type: '',
    description: 'The roads are in such bad conditions that you can only hold you breath that you do not pop a tire each time out driving'
})


const traffic = new Category({
    topic: 'traffic',
    description: 'Place to rant about traffic issues',
    vents: [potHoles]
})

Category.remove({})
  .then(() => traffic.save())
  .then(() => console.log('Successful Save'))
  .then(() => mongoose.connection.close())