const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const authentication = require("../middlware/authentication").verify;

router.use(authentication);

router.post("/", commentController.postComment);
router.get("/", commentController.getAllComment);
router.put("/:id", commentController.updateComments);
router.delete("/:id", commentController.deleteComments);

module.exports = router;