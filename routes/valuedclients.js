const express = require('express');
const router = express.Router();
const ValuedClientcontroller = require('../controller/valuedclientcontroller');
const upload = require('../config/multer');




router.post('/', upload.single('images'), ValuedClientcontroller.addvaluedclients );
router.get('/', ValuedClientcontroller.getvaluedclients );
router.put('/:id', upload.single('image'), ValuedClientcontroller.putvaluedclients );
router.delete('/:id', ValuedClientcontroller.deletevaluedclients  );

module.exports = router;
