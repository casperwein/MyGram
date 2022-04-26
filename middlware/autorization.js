const User = require("../models/index").user;

function userAutorization(res, req, next) {
    const id = req.params.id;
    const user_id = req.id;
    User.findOne({
            where: {
                id,
            },
        })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    msg: "id not found",
                });
            } else {
                if (user_id === user.user_id) {
                    next();
                } else {
                    res.status(200).json({
                        name: "authorization error",
                        devMessage: `User with  id ${user_id} does not have permission to acces User with id ${id}`,
                    });
                }
            }
        })
        .catch((e) => {
            console.log(e);
            res.status(401).json({
                msg: "INTERNAL SERVER ERROR",
            });
        });
}

module.exports = {
    userAutorization,
};