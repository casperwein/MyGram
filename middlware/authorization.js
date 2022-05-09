const User = require("../models/index").user;
const Photo = require("../models/index").photo;

function userAuthorizationUserController(req, res, next) {
    const id = req.params.id;
    const user_id = req.id;

    User.findOne({ where: { id } })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    message: "id not found",
                });
            } else if (user.id === user_id) {
                next();
            } else {
                res.status(200).json({
                    name: "authorization error",
                    devMessage: `User with  id ${user_id} does not have permission to acces User with id ${id}`,
                });
            }
        })
        .catch((e) => {
            console.log(e);
            res.status(401).json({
                message: "INTERNAL SERVER ERROR",
            });
        });
}

function userAutorizationPhotoController(req, res, next) {
    const id = req.params.id;
    const user_id = req.id;
    Photo.findOne({ where: { id } })
        .then((photos) => {
            if (!photos) {
                res.status(401).json({
                    message: "id not found",
                });
            } else if (user_id === photos.user_id) {
                next();
            } else {
                res.status(200).json({
                    name: "authorization error",
                    devMessage: `User with  id ${user_id} does not have permission to acces Photos with id ${id}`,
                });
            }
        })
        .catch((e) => {
            console.log(e);
            res.status(401).json({
                message: "INTERNAL SERVER ERROR",
            });
        });
}

module.exports = {
    userAuthorizationUserController,
    userAutorizationPhotoController,
};