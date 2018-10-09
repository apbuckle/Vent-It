const Schema = require('mongoose').Schema

const VentSchema = new Schema({
    type: String,
    description: String
})
 
const CategorySchema = new Schema({
    topic: String,
    description: String,
    vents: [VentSchema],
  })

module.exports = {
    CategorySchema,
    VentSchema
}