const Photo = require("../models/index").photo;

exports.postPhoto = async(req, res) => {
    const title = req.body.title;
    const caption = req.body.caption;
    const poster_image_url = req.body.poster_image_url;
    const user_id = req.id;

    Photo.create({
            title: title,
            caption: caption,
            poster_image_url: poster_image_url,
            user_id: user_id,
        })
        .then((photo) => {
            res.status(200).send({
                status: "SUKSES",
                photo: photo,
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