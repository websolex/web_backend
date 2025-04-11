const express = require('express');
const router = express.Router();
const ValuedClientcontroller = require('../controller/valuedclientcontroller');
const upload = require('../config/multer');
const protector = require('../middleware/auth');



router.post('/', protector, upload.single('images'), ValuedClientcontroller.addvaluedclients);
router.get('/', ValuedClientcontroller.getvaluedclients );
router.put('/:id', protector, upload.single('image'), ValuedClientcontroller.putvaluedclients);
router.delete('/:id', protector, ValuedClientcontroller.deletevaluedclients);

module.exports = router;
