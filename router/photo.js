const express = require("express");
const router = express.Router();
const photoController = require("../controller/photoController");
const authenctication = require("../middlware/authentication").verify;

router.post("/post", authenctication, photoController.postPhoto);

module.exports = router;