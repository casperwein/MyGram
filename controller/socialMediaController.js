const SocialMedia = require("../models/index").socialmedia;

exports.getAllSocialMedias = async(req, res) => {
    SocialMedia.findAll()
        .then((socialmedias) => {
            res.status(200).json({
                socialmedias,
            });
        })
        .catch((error) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};

exports.postSocialMedia = async(req, res) => {
    const user_id = req.id;
    const name = req.body.name;
    const social_media_url = req.body.social_media_url;

    await SocialMedia.create({
            name: name,
            social_media_url: social_media_url,
            user_id: user_id,
        })
        .then((socialmedias) => {
            res.status(201).json({
                socialmedias,
            });
        })
        .catch((error) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};

exports.updateSocialMedias = async(req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const social_media_url = req.body.social_media_url;
    const dataSocialMedias = {
        name: name,
        social_media_url: social_media_url,
    };
    await SocialMedia.update(dataSocialMedias, {
            where: { id: id },
            returning: true,
        })
        .then((socialmedias) => {
            res.status(200).json({
                socialmedias: socialmedias[1],
            });
        })
        .catch((error) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};

exports.deleteSocialMedia = async(req, res) => {
    const id = req.params.id;
    await SocialMedia.destroy({ where: { id } })
        .then((socialmedias) => {
            res.status(200).json({
                message: "Your socialmedia has been succesfully deleted",
            });
        })
        .catch((error) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};