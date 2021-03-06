//init
const express = require('express');
const router = express.Router();
const path = require('path');

// get stuff for jwt
const utils = require('../utils/index');
const jwt = require('jsonwebtoken');

// database & models
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = require('../models/user');
const Snippet = require('../models/snippet');

const { authenticateMiddleware } = require('../middlewares/authenticate');

router.use(authenticateMiddleware);

router.get('/users', (req, res) => {
    User
        .find()
        .exec()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500).json({ message: "Issue finding users" });
        });
});

router.get('/snippets/:userid', (req, res) => {
    console.log('getting snippets');
    const userId = req.params.userid;
    Snippet
        .find({userId})
        .exec()
        .then(snippets => {
            res.json(snippets);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500).json({ message: "Issue finding snippets" });
        });
});

router.get('/snippets/:snippetid', (req, res) => {
    Snippet
        .findById(req.params.snippetid)
        .exec()
        .then(snippet => {
            res.json(snippet);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ message: "Issue finding snippet" });
        });
});

router.post('/snippet', (req, res) => {
    const { title, description, language, code, userid } = req.body;
    let newSnippet = new Snippet ({
        title,
        description,
        code,
        userId: mongoose.Types.ObjectId(userid)
    });
        newSnippet.save((err, snippet) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Error adding snippet" });
        }
        console.log("New Snippet Added!");
        return res.json(snippet);
    });
});

router.put('/snippet/:snippetid', (req, res) => {
    // ensure that snippetid in request path and request body match
    if (!(req.params.snippetid && req.body._id && req.params.snippetid === req.body._id)) {
        return res.json({
            message: `Request path id (${req.params.snippetid}) and request body id ` +
                `(${req.body._id}) must match`
        });
    }

    // updatable fields
    const toUpdate = {};
    const updatableFields = ['title', 'description', 'code'];
    updatableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    //{$set: toUpdate}
    Snippet
        .findByIdAndUpdate(req.params.snippetid, { $set: toUpdate })
        .exec()
        .then(snippet => {
            
            res.json(req.body)
        })
        // should send back snippet -- but only showing "created"
        .catch(err => {
            console.error(err);
            return res.sendStatus(500).json({ message: "Issue updating snippet" });
        });

});

// not working at the moment
router.delete('/snippet/:snippetid', (req, res) => {
    Snippet
        .findByIdAndRemove(req.params.snippetid)
        .exec()
        .then(snippet => {
            console.log('snippet ', snippet);
            return res.json(snippet)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Issue with deleting snippet" });
        });

});

module.exports = router;
