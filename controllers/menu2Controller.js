const Menu2 = require('../models/menu2Model')
const mongoose = require('mongoose')

// get all menu
const getMenus2 = async (req, res) => {
  const user_id = req.user._id
 
  const menus2 = await Menu2.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(menus2) 
}

// get a single menu
const getMenu2 = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such menu' })
  }

  const menu2 = await Menu2.findById(id)

  if (!menu2) {
    return res.status(404).json({ error: 'No such menu' })
  }

  res.status(200).json(menu2)
}

// create new menu
const createMenu2 = async (req, res) => {
  console.log("Creating Menu")
  console.log(req.body)
  const { name, desc, price } = req.body
  const image = req.file.filename; 

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!desc) {
    emptyFields.push('desc')
  }
  if (!price) {
    emptyFields.push('price')
  }
  // if (!stock) {
  //   emptyFields.push('stock')
  // }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const menu2 = await Menu2.create({ name, desc, price, image, user_id })
    res.status(200).json(menu2)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a menu
const deleteMenu2 = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such menu' })
  }

  const menu2 = await Menu2.findOneAndDelete({ _id: id })

  if (!menu2) {
    return res.status(400).json({ error: 'No such menu' })
  }

  res.status(200).json(menu2)
}

// update a menu
const updateMenu2 = async (req, res) => {
  const { id } = req.params
  console.log(id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such menu' })
  }

  const menu2 = await Menu.findOneAndUpdate({ _id: id }, {
    ...req.body 
  })

  if (!menu2) {
    return res.status(400).json({ error: 'No such menu' })
  }

  res.status(200).json(menu2)
}

module.exports = {
  getMenus2,
  getMenu2,
  createMenu2,
  deleteMenu2,
  updateMenu2
}