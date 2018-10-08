const mongoose = require('mongoose')
const { CategorySchema, VentSchema } = require('./schema')

const CategoryModel = mongoose.model('Category', CategorySchema)
const VentModel = mongoose.model('Vent', VentSchema)

module.exports = {
    Category: CategoryModel,
    Vent: VentModel
}