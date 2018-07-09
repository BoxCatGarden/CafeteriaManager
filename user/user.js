/**
 * Created by BoxCatGarden on 2018/6/10.
 */
var router = require('express').Router();
module.exports = router;

var model = require('./model');

router.use(require('./verify'));

//sign in; if success, redirect to 'bill.html'; else 0
router.post('/signin', (req, res) => {
    model.signIn(req.body, (e, r) => {
        if (e) throw e;
        else if (r) {
            req.session.user = r;
            res.redirect('/');
        } else res.json(0); //fail
    });
});

//sign out; redirect to HOME_PAGE anyhow
router.post('/signout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

//get the User; return the User anyhow
router.get('/', (req, res) => {
    res.json(req.session.user);
});

//change the User-info; return the new-User if success; else 0
router.post('/setinfo', (req, res) => {
    model.setUserProp(req.session.user, req.body, (e, r) => {
        if (e) throw e;
        else res.json(r);
    });
});

//change password; if success, return 1; else 0
router.post('/chpwd', (req, res) => {
    model.changePwd(req.session.user.id, req.body, (e, r) => {
        if (e) throw e;
        else res.json(r);
    });
});