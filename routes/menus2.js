const express = require('express')
const {
  getMenus2,
  getMenu2,
  createMenu2,
  deleteMenu2,
  updateMenu2
} = require('../controllers/menu2Controller')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

const multer = require ('multer')

//Multer untuk upload image
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  }
});
const upload = multer({ storage: fileStorageEngine });


// require auth for all menu routes
router.use(requireAuth)

// GET all menus
router.get('/', getMenus2)

//GET a single menu
router.get('/:id', getMenu2)

// POST a new menu
router.post('/', upload.single("image"), createMenu2)

// DELETE a menu
router.delete('/:id', deleteMenu2)

// UPDATE a menu 
router.patch('/:id', updateMenu2) 

module.exports = router