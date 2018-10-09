const router = require('express').Router()
const { Category } = require('../db/model')

// Show All
router.get('/', async (req, res) => {
  const categories = await Category.find()
  res.send(categories)
})

// Show One
router.get('/:id', async (req, res) => {
  // const user = await User.find({ _id: req.params.id })
  const category = await Category.findById(req.params.id)
  res.send(category)
})

// Create
router.post('/', async (req, res) => {
  const category = await Category.create(req.body)
  res.send(category)
})

// Update
router.put('/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.send(category)
})

// Delete
router.delete('/:id', async (req, res) => {
  await Category.findByIdAndRemove(req.params.id)
  res.sendStatus(200)
})

module.exports = router