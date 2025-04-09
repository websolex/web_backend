const express = require('express');
const router = express.Router();
const Projectcontroller = require('../controller/projectcontroller');

router.post('/', Projectcontroller.addproject )
router.get('/',Projectcontroller.getproject );
router.put('/:id',Projectcontroller.putproject );

module.exports = router;
