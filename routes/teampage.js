const express = require('express');
const router = express.Router();
const TeamPagecontroller = require('../controller/teampagecontroller');
const upload = require('../config/multer');

const protector = require('../middleware/auth');

router.post('/', protector, upload.single('image'), TeamPagecontroller.addteam);
router.get('/', TeamPagecontroller.getteam);
router.get('/:id', protector, TeamPagecontroller.getbyidteam);
router.put('/:id', protector, upload.single('image'), TeamPagecontroller.putteam);
router.delete('/:id', protector, TeamPagecontroller.deleteteam);




module.exports = router;
