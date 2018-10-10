const router = require('express').Router({ mergeParams: true })
const { Category, Vent } = require('../db/model')

//Create
router.post('/', (req, res) => {
  const newVent = new Vent(req.body)
  Category.findById(req.params.categoryId)
    .then((category) => {
      category.vents.push(newVent)
      return category.save()
    })
    .then((category) => {
      res.send(category)
    })
})

//Update
router.put('/:id', (req, res) => {
  Category.findById(req.params.categoryId)
    .then(category => {
      const vent = category.vents.id(req.params.id)
      const updatedVent = req.body

      if (updatedVent.title) {
        vent.title = updatedVent.title
      }

      if (updatedVent.description) {
        vent.description = updatedVent.description
      }

      return category.save()
    })
    .then(category => {
      res.send(category)
    })
})

//Delete
router.delete('/:id', (req, res) => {
    Category.findById(req.params.categoryId)
      .then(category => {
        return category.update({ $pull: { vents: { _id: req.params.id } } })
      })
      .then(category => {
        res.send(category)
      })
  })
  

module.exports = router