const express = require("express");
const router = express.Router();
const protector = require('../middleware/auth');
const upload = require("../config/multer");
const ourworkcontroller = require("../controller/lastworkcontroller");

router.post("/", protector, upload.single("image_work"), ourworkcontroller.postourwork);
router.get("/", ourworkcontroller.getourwork);
router.get("/:id", ourworkcontroller.getourworkbyid);
router.put(
  "/:id", protector,
  upload.single("image_work"),
  ourworkcontroller.updateourwork
);
router.delete("/:id", protector, ourworkcontroller.deleteourwork);

module.exports = router;
