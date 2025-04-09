const express = require('express');
const router = express.Router();
const {
    getViewCount,
    incrementViewCount
} = require('../controller/viewcountcontroller');


router.post('/', incrementViewCount);
router.get('/', getViewCount);


module.exports = router;
