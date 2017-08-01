const express = require('express'),
    router = express.Router(),
    User = require('../models/users');

router.route('/')
    .get((req, res, next) => {
        User.find({}, (err, users) => {
            if (err) {
                return console.error(err);
            } else {
                res.format({
                    json: () => {
                        res.json(users);
                    }
                });
            }
        });
    })
    .post((req, res) => {
        const body = req.body;
        User.create(body, (err, user) => {
            if (err) {
                res.send('There was a problem adding the information to the database.');
            } else {
                console.log('POST creating new user: ' + user);
                res.format({
                    json: () => {
                        res.json(user);
                    }
                });
            }
        });
    });

// route middleware to validate :id
router.param('id', (req, res, next, id) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log(id + ' was not found');
            res.status(404);
            const err = new Error('Not Found');
            err.status = 404;
            res.format({
                json: () => {
                    res.json({ message: err.status + ' ' + err });
                }
            });
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(user);
            // once validation is done save the new item in the req
            req.id = id;
            next();
        }
    });
});

router.route('/:id')
    .get((req, res) => {
        User.findById(req.id, (err, user) => {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
            } else {
                console.log('GET Retrieving ID: ' + user._id);
                let userdob = user.dob.toISOString();
                userdob = userdob.substring(0, userdob.indexOf('T'));
                res.format({
                    json: () => {
                        res.json(user);
                    }
                });
            }
        });
    });

router.route('/:id/edit')
    .get((req, res) => {
        User.findById(req.id, (err, user) => {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
            } else {
                console.log('GET Retrieving ID: ' + user._id);
                let userdob = user.dob.toISOString();
                userdob = userdob.substring(0, userdob.indexOf('T'));
                res.format({
                    json: () => {
                        res.json(user);
                    }
                });
            }
        });
    })
    .put((req, res) => {
        const body = req.body;
        User.findById(req.id, (err, user) => {
            user.update(body, (err, userID) => {
                if (err) {
                    res.send('There was a problem updating the information to the database: ' + err);
                }
                else {
                    res.format({
                        json: () => {
                            res.json(user);
                        }
                    });
                }
            });
        });
    })
    .delete((req, res) => {
        User.findById(req.id, (err, user) => {
            if (err) {
                return console.error(err);
            } else {
                user.remove((err, user) => {
                    if (err) {
                        return console.error(err);
                    } else {
                        console.log('DELETE removing ID: ' + user._id);
                        res.format({
                            json: () => {
                                res.json({
                                    message: 'deleted',
                                    item: user
                                });
                            }
                        });
                    }
                });
            }
        });
    });

module.exports = router;
