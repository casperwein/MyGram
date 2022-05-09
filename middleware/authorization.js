const User = require("../models/index").user;
const Photo = require("../models/index").photo;
const Comment = require("../models/index").comment;
const SocialMedia = require("../models/index").socialmedia;

function userAuthorization(req, res, next) {
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

function photoAuthorization(req, res, next) {
    const photoId = req.params.photoId;
    const user_id = req.id;
    Photo.findOne({ where: { id: photoId } })
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
        .catch((error) => {
            console.log(error);
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
            });
        });
}

function commentAuthorization(req, res, next) {
    const commentId = req.params.commentId;
    const user_id = req.id;
    Comment.findOne({ where: { id: commentId } })
        .then((comment) => {
            if (!comment) {
                res.status(401).json({
                    message: "id not found",
                });
            } else if (user_id === comment.user_id) {
                next();
            } else {
                res.status(200).json({
                    name: "authorization error",
                    devMessage: `User with  id ${user_id} does not have permission to acces comment with id ${id}`,
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
            });
        });
}

function socialMediaAuthorization(req, res, next) {
    const socialMediaId = req.params.socialMediaId;
    const user_id = req.id;
    SocialMedia.findOne({ where: { id: socialMediaId } })
        .then((socialmedia) => {
            if (!socialmedia) {
                res.status(401).json({
                    message: "id not found",
                });
            } else if (user_id === socialmedia.user_id) {
                next();
            } else {
                res.status(200).json({
                    name: "authorization error",
                    devMessage: `User with  id ${user_id} does not have permission to acces socialmedia with id ${id}`,
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
            });
        });
}

module.exports = {
    userAuthorization,
    photoAuthorization,
    commentAuthorization,
    socialMediaAuthorization,
};