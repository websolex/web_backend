const express = require('express');
const router = express.Router();
const Projectcontroller = require('../controller/projectcontroller');
const protector = require('../middleware/auth');
router.post('/',protector, Projectcontroller.addproject )
router.get('/',Projectcontroller.getproject );
router.put('/:id',protector,Projectcontroller.putproject );

module.exports = router;
