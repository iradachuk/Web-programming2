var express = require('express');
var router = express.Router();

// GET /customers
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('customers');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /customers/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('customers');
    var customerId = req.params.id;
    collection.findOne({ id: customerId }, {}, function (e, docs) {
        res.json(docs);
    });
});

// POST /customers
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('customers');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(customerExists) {
        if (customerExists) {
            res.send(`Customer with id ${req.body.id} already exists`);
        } else{
            var customer = {
                id: req.body.id,
                name: req.body.name,
                budget: req.body.budget
            };
            collection.insert(customer, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/customers/${customer.id}`);
                    res.send(`Successfully created Customer [${customer.id}] ${customer.name} ${customer.budget}`);
                }
            });
        }
    });
});

// PUT /customers
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('customers');
    let body = req.body
    var customer = {
        id: req.body.id,
        name: req.body.name,
        budget: req.body.budget
    };

    console.log(body);
    collection.update({ id: customer.id }, customer, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/customers/${customer.id}`);
            res.send(`Successfully updated Customer with id [${customer.id}]`);
        }
    });
});

// DELETE /customers/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('customers');
    var customerId = req.params.id;
    collection.remove({ id: customerId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Successfully deleted Customer with id ${customerId}`);
        }
    });
});

module.exports = router;