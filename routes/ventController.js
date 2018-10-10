const router = require('express').Router({ mergeParams: true })
const { Category, Vent } = require('../db/model')

router.post('/', (req, res) => {
  const newVent = new Vent()
  Category.findById(req.params.categoryId)
    .then((category) => {
      category.vents.push(newVent)
      return category.save()
    })
    .then((category) => {
      res.send(category)
    })
})


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