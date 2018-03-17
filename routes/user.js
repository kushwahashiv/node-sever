const express = require('express');
const router = express.Router();
const models = require('../models');

router.route('/')
    .get((req, res) => {
        models.User.findAll({ include: [models.Role] }).then((result) => {
            res.json(result);
        }).catch((err) => {
            return new Error(err);
        });
    })
    .post((req, res) => {
        const body = req.body;
        models.User.create(body).then((result) => {
            res.json(result);
        }).catch((err) => {
            return new Error(err);
        });
    })
    .patch((req, res) => {
        const body = req.body;
        models.User.findOne({ where: { email: body.email}}).then((user) => {
            if (!user) {
                return new Error(`User - ${body.email} not found in the system`);
            }
            Object.assign(user, body);
            user.save().then((result) => {
                res.json(result);
            }).catch((error) => {
                return new Error(error);
            });
        }).catch((err) => {
            return new Error(err);
        });
    });

module.exports = router;


