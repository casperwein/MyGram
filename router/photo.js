const express = require("express");
const router = express.Router();
const photoController = require("../controller/photoController");
const authentication = require("../middlware/authentication").verify;
const autorization =
    require("../middlware/authorization").userAutorizationPhotoController;

router.use(authentication);

router.post("/post", photoController.postPhoto);
router.get("/", photoController.getAllPhotos);
router.put("/update/:id", autorization, photoController.updatePhoto);
router.delete("/delete/:id", autorization, photoController.deletePhoto);

module.exports = router;