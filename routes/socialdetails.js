const express = require('express');
const router = express.Router();
const SocialDetailscontroller = require('../controller/socialdetailscontroller');
const protector = require('../middleware/auth')

router.post('/',protector, SocialDetailscontroller.addsocial );
router.get('/', SocialDetailscontroller.getsocial );
router.put('/',protector, SocialDetailscontroller.putsocial );

module.exports = router;

