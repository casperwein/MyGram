const User = require("../models/index").user;
const generateToken = require("../middlware/authentication").generateToken;

const bcrypt = require("bcrypt");
const user = require("../models/user");

exports.getAll = async(req, res) => {
    await User.findAll()
        .then((result) => {
            res.status(200).json({
                msg: "DATA",
                data: result,
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(503).json({
                msg: "INTERNAL SERVER ERROR",
                data: result,
            });
        });
};

exports.signUp = async(req, res) => {
    const full_name = req.body.full_name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const profile_image_url = req.body.profile_image_url;
    const age = req.body.age;
    const phone_number = req.body.phone_number;

    User.findOne({
        where: {
            email: email,
            username: username,
        },
    }).then((user) => {
        if (user) {
            return res.status(400).send({
                message: "Email or username already Exist",
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        User.create({
                full_name: full_name,
                email: email,
                username: username,
                password: hash,
                profile_image_url: profile_image_url,
                age: age,
                phone_number: phone_number,
            })
            .then((user) => {
                const data = {
                    id: user.id,
                    email: email,
                    full_name: full_name,
                    username: username,
                    profile_image_url: profile_image_url,
                    age: age,
                    phone_number: phone_number,
                };
                const token = generateToken(data);
                res.status(201).send({
                    status: "SUKSES",
                    token: token,
                    user: data,
                });
            })
            .catch((e) => {
                console.log(e);
                if ((e.name = "SequelizeDatabaseError")) {
                    res.status(401).json({
                        message: "PLEASE INPUT VALID DATA",
                        error: e,
                    });
                } else {
                    res.status(503).json({
                        message: "INTERNAL SERVER ERROR",
                        error: e,
                    });
                }
            });
    });
};

exports.signIn = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        where: {
            email: email,
        },
    }).then((user) => {
        if (!user) {
            res.status(401).json({
                msg: "email not found",
            });
        }
        const passwordValid = bcrypt.compareSync(password, user.password);
        if (!passwordValid) {
            res.status(401).json({
                msg: "password and email not match",
            });
        } else {
            const data = {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                username: user.username,
                profile_image_url: user.profile_image_url,
                age: user.age,
                phone_number: user.phone_number,
            };
            const token = generateToken(data);
            res.status(201).send({
                token: token,
            });
        }
    });
};

exports.updateUser = async(req, res) => {
    const id = req.params.id;
    const full_name = req.body.full_name;
    const email = req.body.email;
    const username = req.body.username;
    const profile_image_url = req.body.profile_image_url;
    const age = req.body.age;
    const phone_number = req.body.phone_number;
    const dataUser = {
        full_name: full_name,
        email: email,
        username: username,
        profile_image_url: profile_image_url,
        age: age,
        phone_number: phone_number,
    };

    return User.update(dataUser, { where: { id: id } })
        .then((userUpdate) => {
            if (!user.length) {
                res.status(402).json({
                    user: "id not found",
                });
            }
            res.status(200).json({
                msg: "UPDATE SUCCES",
                user: userUpdate,
            });
        })
        .catch((e) => {
            res.status(503).json({
                msg: "INTERNAL SERVER ERROR",
            });
        });
};