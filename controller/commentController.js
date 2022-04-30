const Comment = require("../models/index").comment;
const Photo = require("../models/index").photo;

exports.getAllComment = async(req, res) => {
    const user_id = req.id;

    await Comment.findAll({ where: { user_id } })
        .then((comments) => {
            res.status(200).json({
                comments: comments,
            });
        })
        .catch((error) => {
            res.status(503).json({
                msg: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};

exports.postComment = async(req, res) => {
    const user_id = req.id;
    const comment = req.body.comment;
    const photo_id = req.body.photo_id;

    await Photo.findOne({ where: { id: photo_id } }).then((photos) => {
        if (!photos) {
            res.status(401).json({
                msg: `photo with id ${photo_id} not found`,
            });
        }
        return Comment.create({
                comment: comment,
                user_id: user_id,
                photo_id: photo_id,
            })
            .then((result) => {
                res.status(200).json({
                    msg: "comment succes",
                    result: result,
                });
            })
            .catch((err) => {
                res.status(503).json({
                    msg: "internal server error",
                    result: err,
                });
            });
    });
};

exports.updateComments = async(req, res) => {
    const id = req.params.id;
    const comment = req.body.comment;
    const dataComment = {
        comment: comment,
    };
    await Comment.update(dataComment, {
            where: { id },
            returning: true,
        })
        .then((comments) => {
            res.status(200).json({
                comments: comments[1],
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(503).json({
                msg: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};

exports.deleteComments = async(req, res) => {
    const id = req.params.id;
    await Comment.destroy({ where: { id } }).then((comments) => {
        res
            .status(200)
            .json({
                message: "Your comments has been succesfully deleted",
            })
            .catch((error) => {
                res.status(503).json({
                    message: "INTERNAL SERVER ERROR",
                    error: error,
                });
            });
    });
};