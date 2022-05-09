const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authenctication = require("../middlware/authentication").verify;
const authorization =
    require("../middlware/authorization").userAuthorizationUserController;

router.post("/register", userController.signUp);
router.post("/login", userController.signIn);
router.get("/", userController.getAll);
router.put(
    "/update/:id",
    authenctication,
    authorization,
    userController.updateUser
);
router.delete(
    "/delete/:id",
    authenctication,
    authorization,
    userController.deleteUser
);

module.exports = router;