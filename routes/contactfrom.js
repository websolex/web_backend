const express = require('express');
const router = express.Router();
const {
 
    contactpost,
    contactget
} = require('../controller/contactfromcontroller');



router.post('/', contactpost);
router.get('/', contactget);


module.exports = router;
