/**
 * Created by BoxCatGarden on 2018/6/10.
 */
var router = require('express').Router();
module.exports = router;

var model = require('./model');

router.use(require('./verify'));

/* add a eating log; if success, return 1; else 0
 * it's an API for Card Reader*/
router.post('/u~.LnxtNthL9.SX8EEsJpL8-4SKJ5u6_', (req, res) => {
    model.add(req.body, (e, r) => {
        if (e) throw e;
        else res.json(r);
    });
});

//query employees who match the conditions; return the result-set
router.get('/emp', (req, res) => {
    model.queryEmp(req.query, (e, r) => {
        if (e) throw e;
        else res.json(r);
    });
});

//query eating logs that match the conditions; return the result-set
router.get('/log', (req, res) => {
    model.queryLog(req.query, (e, r) => {
        if (e) throw e;
        else res.json(r);
    });
});