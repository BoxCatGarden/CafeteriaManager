/**
 * Created by BoxCatGarden on 2018/6/10.
 */
var router = require('express').Router();
module.exports = router;

var model = require('./model');

router.use(require('./verify'));

//if having it, return 1; else 0
router.get('/has', (req, res) => {
    model.has(req.query, (e, r) => {
        if (e) throw e;
        else res.json(r);
    });
});

/* add employee
 * if success, return 1; else
 * if fail to add the employee, return 0; else
 * if the id is duplicate, return 2 */
router.post('/add', (req, res) => {
    model.add(req.body, (e, r) => {
        if (e) throw e;
        else res.json(r);
    });
});

//modify employee; if success, return 1; else 0
router.post('/mod', (req, res) => {
    model.modify(req.body, (e, r) => {
        if (e) throw e;
        else res.json(r);
    });
});

//query employee; return the result-set anyhow
router.get('/', (req, res) => {
    model.query(req.query, (e, r) => {
        if (e) throw e;
        else res.json(r);
    });
});

//delete employee; if success, return 1; else 0
router.post('/del', (req, res) => {
    model.del(req.body, (e, r) => {
        if (e) throw e;
        else res.json(r);
    });
});