const express = require('express');
const router = express.Router();
const ContactDetailcontroller = require('../controller/contactdetilscontroller');
const protector = require('../middleware/auth')



router.post('/', protector, ContactDetailcontroller.postcontectdetails);
router.get('/', ContactDetailcontroller.getcontectdetails)
router.put('/', protector, ContactDetailcontroller.putcontectdetails);

module.exports = router;

