const express = require('express');
const Comment = require('../schemas/comment');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const comment = await Comment.create({commenter: req.body.id, comment: req.body.comment});
        console.log('comment: ', comment);
        const result = await Comment.populate(comment, {path: 'commenter'});
        res.status(201).json(result);
    }   
    catch(e) {
        console.log('error: ', e);
        next(e);
    }
});

router.route('/:id')
    .patch(async(req, res, next) => {
        try {
            const {id, comment} = req.params;
            const result = await Comment.update({_id: id}, {
                comment
            });
            res.json(result);
        }
        catch(e) {
            console.log('error: ', e);
            next(e);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Comment.remove({_id: route.params.id});
            res.json(result);
        }
        catch(e) {
            console.log('error: ', e);
            next(e);
        }
    })

module.exports = router;