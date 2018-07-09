/**
 * Created by BoxCatGarden on 2018/6/13.
 */

exports.reporter = (err, req, res, next) => {
    console.error(err);
    next(err);
};