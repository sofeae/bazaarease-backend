const express = require('express')
const {
  getMenus,
  getMenu,
  createMenu,
  deleteMenu,
  updateMenu
} = require('../controllers/menuController')
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
router.get('/', getMenus)

//GET a single menu
router.get('/:id', getMenu)

// POST a new menu
router.post('/', upload.single("image"), createMenu)

// DELETE a menu
router.delete('/:id', deleteMenu)

// UPDATE a menu 
router.patch('/:id', updateMenu) 

module.exports = router