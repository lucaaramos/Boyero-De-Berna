const { tokenValidation } = require("../lib/validateToken");
const express = require("express");
const { img, imgSponsors, imgNews } = require("../controllers/image.controllers");
const router = express.Router();
const path = require("path");


const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads"))
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname || "").toLowerCase();
      cb(null,`${Date.now()}${ext}`)
    }
  });

  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  const fileFilter = (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Tipo de archivo no permitido"));
    }
    cb(null, true);
  };
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
  });

router.post("/image/:id",tokenValidation,upload.single('image'),img)
router.post("/imageSponsors/:id",tokenValidation,upload.single('image'),imgSponsors)
router.post("/news/:id",tokenValidation,upload.single('image'),imgNews)


module.exports = router

