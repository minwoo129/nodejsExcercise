const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await User.find({});
            res.json(users);
        }
        catch(e) {
            console.log('get user error: ', e);
            next(e);
        }
    })
    .post(async (req, res, next) => {
        try {
            const {name, age, married} = req.body;
            const user = await User.create({name, age, married});
            console.log('user: ', user);
            res.status(201).json(user);
        }
        catch(e) {
            console.log('add user error: ', e);
            next(e);
        }
    })

router.get('/:id/comments', async (req, res, next) => {
    try {
        const comments = await Comment.find({commenter: req.params.id}).populate('commenter');
        console.log('comments: ', comments);
        res.json(comments);
    }
    catch(e) {
        console.log('error: ', e);
        next(e);
    }
});

module.exports = router;