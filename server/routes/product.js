const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');
const multer = require('multer');

const { auth } = require('../middleware/auth');

var storage = multer.diskStorage({
  //파일 위치 지정
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  //어떤 이름으로 저장할것인지
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(res.status(400).end('only jpg, png are allowed'), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single('file');

//=================================
//             Product
//=================================

router.post('/uploadImage', auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;