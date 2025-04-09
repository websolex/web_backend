"use strict";
const express = require("express");
const router = express();
const users = require('./users')
const blogpage = require('./blogpage')
const clientrate = require('./clientrate')
const contactdetails = require('./contactdetails')
const lastwork = require('./lastwork')
const project = require('./project')
const contactfrom = require('./contactfrom')
const socialdetails = require('./socialdetails')
const teampage = require('./teampage')
const valuedclients = require('./valuedclients')
const subscribefrom = require('./subscribefrom')
const viewcount = require('./viewcount')

router.use('/user', users);
router.use('/viewcount', viewcount);
router.use('/blogpage', blogpage);
router.use('/clientrate', clientrate);
router.use('/contactdetails', contactdetails);
router.use('/lastwork', lastwork);
router.use('/subscribefrom', subscribefrom);
router.use('/project', project);
router.use('/contactfrom', contactfrom);
router.use('/socialdetails', socialdetails);
router.use('/teampage', teampage);
router.use('/valuedclients', valuedclients);

module.exports = router


