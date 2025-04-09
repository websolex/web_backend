const express = require('express');
const router = express.Router();
const ContactDetailcontroller = require('../controller/contactdetilscontroller');



router.post('/', ContactDetailcontroller.postcontectdetails );
router.get('/', ContactDetailcontroller.getcontectdetails )
router.put('/', ContactDetailcontroller.putcontectdetails );

module.exports = router;

