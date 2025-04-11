const express = require('express');
const router = express.Router();
const protector = require('../middleware/auth');
const blogcontroller = require('../controller/blogcontroller')
const uploads = require('../config/multer')

router.post('/', protector, uploads.single('image_client_work'), blogcontroller.postblog);
router.get('/', protector, blogcontroller.getblog);
router.put('/:id', protector, uploads.single('image_client_work'), blogcontroller.updateblog);
router.delete('/:id', protector, blogcontroller.deleteblog);

module.exports = router;