const Schema = require('mongoose').Schema

const VentSchema = new Schema({
    title: String,
    description: String
})
 
const CategorySchema = new Schema({
    title: String,
    vents: [VentSchema],
  })

module.exports = {
    CategorySchema,
    VentSchema
}