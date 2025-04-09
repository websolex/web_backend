const express = require('express');
const router = express.Router();
const SocialDetailscontroller = require('../controller/socialdetailscontroller');

router.post('/', SocialDetailscontroller.addsocial );
router.get('/', SocialDetailscontroller.getsocial );
router.put('/', SocialDetailscontroller.putsocial );

module.exports = router;

