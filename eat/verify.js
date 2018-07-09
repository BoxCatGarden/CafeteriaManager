/**
 * Created by BoxCatGarden on 2018/6/13.
 */
module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.type === 1)
        res.redirect('/');
    else {
        var method = req.method,
            param = method == 'POST' ? req.body : method == 'GET' ? req.query : [];
        for (let i in param) {
            switch (i) {
                case 'd':
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

                case 'i':
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


/*var method = 'POST',
    query = {
    y:2,
        m:12
    },
    body = {
    i:12
    };

module.exports({
        method: method,
        query: query,
        body: body,
        session: {
            user: {
                type: 2
            }
        }
    },
    {
        redirect(url) {
            console.log('redirect to ' + url);
        },
        send(d) {
            console.log('send ' + d);
        }
    },
    () => {console.log('next');console.log(method=='GET'?query:body);});
*/