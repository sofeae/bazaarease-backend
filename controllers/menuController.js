const Menu = require('../models/menuModel')
const mongoose = require('mongoose')

// get all menu
const getMenus = async (req, res) => {
  const user_id = req.user._id
 
  const menus = await Menu.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(menus) 
}

// get a single menu
const getMenu = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such menu' })
  }

  const menu = await Menu.findById(id)

  if (!menu) {
    return res.status(404).json({ error: 'No such menu' })
  }

  res.status(200).json(menu)
}

// create new menu
const createMenu = async (req, res) => {
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
    const menu = await Menu.create({ name, desc, price, image, user_id })
    res.status(200).json(menu)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a menu
const deleteMenu = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such menu' })
  }

  const menu = await Menu.findOneAndDelete({ _id: id })

  if (!menu) {
    return res.status(400).json({ error: 'No such menu' })
  }

  res.status(200).json(menu)
}

// update a menu
const updateMenu = async (req, res) => {
  const { id } = req.params
  console.log(id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such menu' })
  }

  const menu = await Menu.findOneAndUpdate({ _id: id }, {
    ...req.body 
  })

  if (!menu) {
    return res.status(400).json({ error: 'No such menu' })
  }

  res.status(200).json(menu)
}

module.exports = {
  getMenus,
  getMenu,
  createMenu,
  deleteMenu,
  updateMenu
}