/**
 * Created by BoxCatGarden on 2018/6/13.
 */
module.exports = (req, res, next) => {
    if (req.session.user.type === 1)
        res.redirect('/');
    else {
        var method = req.method,
            param = method == 'POST' ? req.body : method == 'GET' ? req.query : [];
        for (let i in param) {
            switch (i) {
                case 's':
                case 'st':
                case 'nm':
                    if (isNaN(param[i] *= 1)) {
                        res.send('0');
                        return;
                    }
                    break;

                case 'i':
                case 'n':
                case 'b':
                case 'ph':
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

/*require('../test/model-verify-tester')(module.exports,
    {
        method: 'POST',
        userType: 2,
        param: {
            i: 123,
            s: '5',
            ph: '6',
            st: '33a',
            nm: 8
        }
    }, '0');*/