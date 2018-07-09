/**
 * Created by BoxCatGarden on 2018/6/13.
 */
module.exports = (req, res, next) => {
    var method = req.method,
        param = method == 'POST' ? req.body : method == 'GET' ? req.query : [];
    for (let i in param) {
        switch (i) {
            case 'ui':
            case 'p':
            case 'op':
            case 'np':
            case 'n':
                if (param[i] != null)
                    param[i] += '';
                break;

            default:
                break;
        }
    }
    next();
};

/*require('../test/model-verify-tester')(module.exports,
    {
        method: 'GET',
        userType:0,
        param:{
            ui:1,
            p:123456,
            op:'123456',
            np:654321,
            n:222,
            l:5
        }
    });
*/