const express = require("express");
const router = express.Router();
const socialMediaController = require("../controller/socialMediaController");
const authentication = require("../middleware/authentication").verify;
const authorization = require("../middleware/authorization");

router.use(authentication);
router.post("/", socialMediaController.postSocialMedia);
router.get("/", socialMediaController.getAllSocialMedias);
router.put("/:socialMediaId", socialMediaController.updateSocialMedias);
router.delete("/:id", socialMediaController.deleteSocialMedia);

module.exports = router;