const express = require('express');
const router = express.Router();
const ClientRate = require('../controller/clientratecontroller');
const uploads = require('../config/multer')
const protector = require('../middleware/auth')

router.post('/', protector, uploads.single('image_client_work'), ClientRate.postclientrate);
router.get('/',ClientRate.getclientrate);
router.put('/:id', protector, uploads.single('image_client_work'), ClientRate.putclientrate);
router.delete('/:id', protector, ClientRate.deleteclientrate);

module.exports = router;
