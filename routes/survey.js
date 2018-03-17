const express = require('express'),
    router = express.Router(),
    Survey = require('../models/survey');

router.route('/')
    .get((req, res) => {
        Survey.find({}, (err, result) => {
            if (err) {
                return new Error(err.message);
            }
            res.format({
                json: () => {
                    res.json(result);
                }
            });
        });
    })
    .post((req, res, next) => {
        const body = req.body;
        Survey.create(
            body,
            (err, result) => {
                if (err) {
                    return new Error(err.message);
                }
                res.format({
                    json: () => {
                        res.json(result);
                    }
                });
            });

        next();
    });

module.exports = router;


