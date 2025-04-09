const express = require('express');
const router = express.Router();
const ClientRate = require('../controller/clientratecontroller');
const uploads = require('../config/multer')


router.post('/', uploads.single('image_client_work'),ClientRate.postclientrate );
router.get('/',ClientRate.getclientrate);
router.put('/:id', uploads.single('image_client_work'),ClientRate.putclientrate );
router.delete('/:id',ClientRate.deleteclientrate );

module.exports = router;
