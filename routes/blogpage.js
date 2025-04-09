const express = require('express');
const router = express.Router();
const blogcontroller = require('../controller/blogcontroller')
const uploads = require('../config/multer')

router.post('/', uploads.single('image_client_work'), blogcontroller.postblog);
router.get('/', blogcontroller.getblog);
router.put('/:id', uploads.single('image_client_work'), blogcontroller.updateblog);
router.delete('/:id', blogcontroller.deleteblog);

module.exports = router;