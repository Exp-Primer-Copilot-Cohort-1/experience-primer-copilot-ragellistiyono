// Create web server
var express = require('express');
var router  = express.Router();

// Import model
var Comment = require('../models/comment');

// Get all comments
router.get('/', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
});

// Get one comment
router.get('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            res.send(err);
        }
        res.json(comment);
    });
});

// Create comment
router.post('/', function(req, res) {
    var comment = new Comment();
    comment.name = req.body.name;
    comment.text = req.body.text;
    comment.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Comment created!' });
    });
});

// Update comment
router.put('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            res.send(err);
        }
        comment.name = req.body.name;
        comment.text = req.body.text;
        comment.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Comment updated!' });
        });
    });
});

// Delete comment
router.delete('/:id', function(req, res) {
    Comment.remove({
        _id: req.params.id
    }, function(err, comment) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    });
});

// Export router
module.exports = router;