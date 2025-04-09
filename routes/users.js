const express = require('express');
const router = express.Router();
const protector = require('../middleware/auth');
const {
    Createuser,
    Getusers,
    Userroleemplyye,
    PatchstatusUser,
    PatchroleUser,
    Deleteuser,
    Approveuser,
    GetloginHistory,
    Loginuser,
    Getuserprofile,
    Updateuserprofile
} = require('../controller/userconroller')
const uploads = require('../config/multer')



// User creation and login
router.post('/register', Createuser);
router.post('/login', Loginuser);

// Get users and filtered roles/approval
router.get('/', protector, Getusers);
router.get('/role-employees', protector, Userroleemplyye);
router.get('/pending-approvals', protector, Approveuser);

// Patch routes with clearer paths
router.patch('/status/:id', protector, PatchstatusUser);
router.patch('/role/:id', protector, PatchroleUser);
router.patch('/login-history/:id', protector, GetloginHistory);

// User profile
router.get('/profile', protector, Getuserprofile);
router.put('/profile', protector, uploads.single('profileImage'), Updateuserprofile);

// Delete user
router.delete('/:id', protector, Deleteuser);




module.exports = router;
