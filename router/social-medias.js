const express = require("express");
const router = express.Router();
const socialMediaController = require("../controller/socialMediaController");
const authentication = require("../middlware/authentication").verify;
const authorization =
    require("../middlware/authorization").userAutorizationPhotoController;

router.use(authentication);
router.post("/", socialMediaController.postSocialMedia);
router.get("/", socialMediaController.getAllSocialMedias);
router.put("/:id", socialMediaController.updateSocialMedias);
router.delete("/:id", socialMediaController.deleteSocialMedia);

module.exports = router;