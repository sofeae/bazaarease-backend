const { S3Client } = require("@aws-sdk/client-s3");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const {
  getMenus,
  getMenu,
  createMenu,
  deleteMenu,
  updateMenu,
} = require("../controllers/menuController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//Multer untuk upload image
// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "--" + file.originalname);
//   },
// });

const s3 = new S3Client({
  credentials: {
    accessKeyId: "633585615a9f56f9278d5b923f358c88",
    secretAccessKey:
      "90316668da0077c0fae5479da65f72c74ecb453a0eb20b394bec31948832f5ec",
  },
  endpoint: "https://6b4326a40faaf511420eb0a6821d7d2b.r2.cloudflarestorage.com",
  region: "us-east-1",
});
const fileStorageEngine = multerS3({
  s3: s3,
  bucket: "bazaarease",
  cacheControl: "max-age=2592000",
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

// require auth for all menu routes
router.use(requireAuth);

// GET all menus
router.get("/", getMenus);

//GET a single menu
router.get("/:id", getMenu);

// POST a new menu
router.post("/", upload.single("image"), createMenu);

// DELETE a menu
router.delete("/:id", deleteMenu);

// UPDATE a menu
router.patch("/:id", upload.single("image"), updateMenu);

module.exports = router;
