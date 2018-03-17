const express = require('express');
const router = express.Router();
const models = require('../models');

router.route('/')
    .get((req, res) => {
        models.Role.findAll({ include: [models.User] }).then((result) => {
            res.json(result);
        }).catch((err) => {
            return new Error(err);
        });
    })
    .post((req, res) => {
        const body = req.body;
        models.Role.create(body).then((result) => {
            res.json(result);
        }).catch((err) => {
            return new Error(err);
        });
    });

module.exports = router;


