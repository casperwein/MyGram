const Comment = require("../models/index").comment;

exports.postComment = (req, res) => {
    const name = req.body.name;
    const user_id = req.body.user_id;
    const photo_id = req.body.photo_id;

    Comment.create({
            name: name,
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
};