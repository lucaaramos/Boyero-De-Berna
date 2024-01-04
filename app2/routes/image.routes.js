const { tokenValidation } = require("../lib/validateToken");
const express = require("express");
const { img, imgSponsors, imgNews } = require("../controllers/image.controllers");
const router = express.Router();


const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../app2/uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop()
      cb(null,`${Date.now()}.${ext}`)
    }
  });
  
  const upload = multer({ storage: storage });

router.post("/image/:id",upload.single('image'),tokenValidation,img)
router.post("/imageSponsors/:id",upload.single('image'),tokenValidation,imgSponsors)
router.post("/news/:id",upload.single('image'),tokenValidation,imgNews)


module.exports = router


