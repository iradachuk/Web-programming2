var express = require('express');
var router = express.Router();

// GET /project_in_Progress/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('projectInProgress');
    var projectInProgressId = req.params.id;
    collection.findOne({id: projectInProgressId}, {}, function (e, docs) {
        res.json(docs);
    });
});

// POST /project_in_Progress
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('projectInProgress');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(projectInProgressExists) {
        if (projectInProgressExists) {
            res.send(`Project In Progress with id ${req.body.id} already exists`);
        } else {
            var projectInProgress = {
                id: req.body.id,
                project: req.body.project,
                performer: req.body.performer,
                begin: req.body.begin,
                end: req.body.end
            };
            collection.insert(projectInProgress, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/${project_in_Progress.id}`);
                    res.send(`Successfully created project in Progress [${projectInProgress.id}] ${projectInProgress.project} ${projectInProgress.performer} ${projectInProgress.begin}${projectInProgress.end})`);
                }
            });
        }
    });
});

// PUT /project_in_Progress
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('projectInProgress');
    var projectInProgress = {
        id: req.body.id,
        project: req.body.project,
        performer: req.body.performer,
        begin: req.body.begin,
        end: req.body.end
    };
    collection.update({ id: projectInProgress.id }, projectInProgress, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/${project_in_Progress.id}`);
            res.send(`Successfully updated project in Progress with id [${projectInProgress.id}]`);
        }
    });
});

// DELETE /project_in_Progress/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('projectInProgress');
    var projectInProgressId = req.params.id;
    collection.remove({ id: projectInProgressId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Successfully deleted project in Progress with id ${projectInProgressId}`);
        }
    });
});

module.exports = router;