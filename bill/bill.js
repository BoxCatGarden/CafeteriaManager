/**
 * Created by BoxCatGarden on 2018/6/10.
 */
var router = require('express').Router();
module.exports = router;

var model = require('./model');

router.use(require('./verify'));

//get bills that match the conditions; return the result-set
router.get('/', (req, res) => {
    model.gene(req.query, (e, r) => {
        if (e) throw e;
        else res.json(r);
    });
});

/* check a bill for specific year and month
 * if success, return 1; else
 * if fail to add the bill, 0; else
 * if fail to sign in, 2 */
router.post('/check', (req, res) => {
    model.check(req.body, (e, r) => {
        if (e) throw e;
        else res.json(r);
    });
});
