/**
 * Created by BoxCatGarden on 2018/6/12.
 */
module.exports = (req, res, next) => {
    if (req.session.user.type === 2 && req.path === '/check')
        res.redirect('/');
    else {
        var method = req.method,
            param = method == 'POST' ? req.body : method == 'GET' ? req.query : [];
        for (let i in param) {
            switch (i) {
                case 'm':
                case 'y':
                case 'tp':
                case 'st':
                case 'nm':
                    if (isNaN(param[i] *= 1)) {
                        res.send('0');
                        return;
                    }
                    break;

                case 'ui':
                case 'p':
                    if (param[i] != null)
                        param[i] += '';
                    break;

                default:
                    break;
            }
        }
        next();
    }
};