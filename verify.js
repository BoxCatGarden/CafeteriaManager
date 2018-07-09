/**
 * Created by BoxCatGarden on 2018/6/10.
 */

module.exports = function (req, res, next) {
    if (req.session.user || req.path === '/eat/u~.LnxtNthL9.SX8EEsJpL8-4SKJ5u6_' || req.path === '/user/signin') {
        //console.log(req.session.user);
        next();
    } else {
        res.redirect('/signin.html');
    }
};