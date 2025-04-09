const express = require('express');
const router = express.Router();
const TeamPagecontroller = require('../controller/teampagecontroller');
const upload = require('../config/multer');



router.post('/',  upload.single('image'),TeamPagecontroller.addteam);
router.get('/',TeamPagecontroller.getteam );
router.get('/:id',TeamPagecontroller.getbyidteam );
router.put('/:id',  upload.single('image'),TeamPagecontroller.putteam );
router.delete('/:id',TeamPagecontroller.deleteteam  );




module.exports = router;
