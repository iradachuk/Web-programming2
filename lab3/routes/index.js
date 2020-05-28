const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('pages/index');
});

router.get('/customers', function(req, res) {
    res.render('pages/customers');
});

router.get('/performers', function(req, res) {
    res.render('pages/performers');
});

router.get('/projects', function(req, res) {
    res.render('pages/projects');
});

router.get('/projectInProgress', function(req, res) {
    res.render('pages/projectInProgress');
});

module.exports = router;