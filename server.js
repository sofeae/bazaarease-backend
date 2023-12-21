require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const menuRoutes = require('./routes/menus')
const userRoutes = require('./routes/user')
const menu2Routes = require('./routes/menus2')
// const customerRoutes = require('./routes/customer')
// const multer = require ('multer')

// express app
const app = express()

// middleware
app.use(cors());
app.use(express.static('images'))
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.body, req.method)
  next()
})

// routes
app.use('/api/menus', menuRoutes)
app.use('/api/menus2', menu2Routes)
app.use('/api/user', userRoutes)
// app.use('/api/customer', customerRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  }) 
  .catch((error) => {
    console.log(error)
  }) 