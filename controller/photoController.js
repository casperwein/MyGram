const Photo = require("../models/index").photo;
const Comment = require("../models/index").comment;
const User = require("../models/index").comment;

exports.getAllPhotos = async(req, res) => {
    const user_id = req.id;

    // const commentSelect = async(photo_id) => {
    //     await Comment.findOne({ where: { photo_id } }).then((comments) => {
    //         return comments;
    //     });
    // };

    // const userSelect = async(user_id) => {
    //     await User.findOne({ where: { user_id } }).then((user) => {
    //         return user;
    //     });
    // };

    return Photo.findAll({
            where: {
                user_id: user_id,
            },
        })
        .then((photos) => {
            // const dataPhotos = () => {
            //     for (let i = 1; i < photos.rows; i++) {
            //         const photo = [{
            //             photos: photos.rows[i],
            //             comment: {
            //                 comment: commentSelect(photos.rows[i].photo_id),
            //                 user: {
            //                     username: "casperwein",
            //                 },
            //             },
            //             user: userSelect(photos.rows[i].user_id),
            //         }, ];
            //         return photo;
            //     }
            // };
            res.status(200).json({
                photo: photos,
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(503).json({
                msg: "INTERNAL SERVER ERROR",
                error: e,
            });
        });
};

exports.postPhoto = async(req, res) => {
    const title = req.body.title;
    const caption = req.body.caption;
    const poster_image_url = req.body.poster_image_url;
    const user_id = req.id;

    await Photo.create({
            title: title,
            caption: caption,
            poster_image_url: poster_image_url,
            user_id: user_id,
        })
        .then((photo) => {
            res.status(200).send({
                id: photo.id,
                title: photo.title,
                poster_image_url: photo.poster_image_url,
                caption: photo.caption,
                user_id: photo.user_id,
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: e,
            });
        });
};

exports.updatePhoto = async(req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const caption = req.body.caption;
    const poster_image_url = req.body.poster_image_url;
    const dataPhoto = {
        title,
        caption,
        poster_image_url,
    };
    await Photo.update(dataPhoto, {
            where: { id },
            returning: true,
        })
        .then((photos) => {
            res.status(200).json({
                photos: photos[1],
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(503).json({
                msg: "INTERNAL SERVER ERROR",
            });
        });
};

exports.deletePhoto = async(req, res) => {
    const id = req.params.id;
    await Photo.destroy({ where: { id } })
        .then(() => {
            res.status(200).json({
                message: "Your Photo has been succesfully deleted",
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: e,
            });
        });
};