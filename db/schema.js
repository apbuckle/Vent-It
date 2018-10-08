const Schema = require('mongoose').Schema

const VentSchema = new Schema({
    type: String,
    description: String
})
 
const CategoriesSchema = new Schema({
    topic: String,
    description: String,
    vents: [VentSchema],
  })

module.exports = {
    CategoriesSchema,
    VentSchema
}