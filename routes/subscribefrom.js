const express = require('express');
const router = express.Router();
const { postsubscribe,
    getsubscribe } = require('../controller/subscribecontroller');
    


router.post('/', postsubscribe);
router.get('/', getsubscribe);

module.exports = router;