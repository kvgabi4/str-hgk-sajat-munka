const express = require('express');
//const data = require('./data.json');
const User = require('../../models/user.model');
const createError = require("http-errors");
const logger = require('../../config/logger');

const controller = express.Router();

// Get users.
controller.get('/', async (req, res, next) => {
    const users = await User.find();
    logger.debug(`Get all users, returning ${users.length} items.`);
    res.json(users);
});

// Get one user.
controller.get('/:id', async (req, res, next) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        return next(new createError.NotFound("User is not found"));
    };
    logger.debug(`Get one user, returning ${user}`);
    res.json(JSON.stringify(user));
});

// Create a new user.
controller.post('/', async (req, res, next) => {
    const { username, password, role } = await req.body;
    if (!username || !password || !role) {
        return next(
            new createError.BadRequest("Missing properties!")
            );
    }
    const newUser = new User({
        username: username,
        password: username,
        role: role
    });
    
    newUser.save()
    .then(data => {
        res.status(201);
        res.json(data);
    });
    logger.debug(`Posting a user.`);
});
    
// Update a user.
controller.put('/:id', async (req, res, next) => {
    const _id = req.params.id;
    const password = req.params.password;
    const role = req.params.role;
    if (!username || !password || !role) {
        return next(
            new createError.BadRequest("Missing properties!")
            );
    };
    
    let user = {};
    try {
        user = await User.findByIdAndUpdate(_id, {
            new: true,
            useFindAndModify: false
        });
    } catch (err) {
        return next(new createError.BadRequest(err));
    }
    
    logger.debug(`The user has been updated.`);
    return res.json(user);
});
        
// Delete a user.
controller.delete('/:id', async (req, res, next) => {
    const _id = req.params.id;

    try {
        await User.deleteOne(_id );
    } catch (err) {
        return next(new createError.NotFound("User is not found"));
    }

    logger.debug(`The user was deleted.`);
    res.json({});
});

module.exports = controller;
