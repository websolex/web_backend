const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const ourworkcontroller = require("../controller/lastworkcontroller");

router.post("/", upload.single("image_work"), ourworkcontroller.postourwork);
router.get("/", ourworkcontroller.getourwork);
router.get("/:id", ourworkcontroller.getourworkbyid);
router.put(
  "/:id",
  upload.single("image_work"),
  ourworkcontroller.updateourwork
);
router.delete("/:id", ourworkcontroller.deleteourwork);

module.exports = router;
