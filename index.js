/**
 * Created by BoxCatGarden on 2018/6/10.
 */
var express = require('express'),
    http = require('http'),
    session = require('express-session'),
    bodyParser = require('body-parser'),

    app = express(),

    pool = require('./data'); //initialize the connection pool positively

//exit
app.get('/exit', (req, res) => {
    if (req.hostname === 'localhost') {
        var ip = req.ip;
        server.close((e) => {
            pool.end();
            console.log(ip + ': server exit');
            if (e) throw e;
        });
        res.send('exit');
    } else res.redirect('/');
});

//xhr special redirect
app.use((req, res, next) => {
        if (req.xhr) {
            res.redirect = (status, path) =>
                res.status(399).json(typeof status === "string" ? status : path);
        }
        next();
    },
//enable session
    session({
        secret: (function randomString(n) {
            var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-*/', s = '';
            while (n > 0) {
                s += c[Math.floor(Math.random() * 66)];
                --n;
            }
            return s;
        })(16),
        cookie: {maxAge: 30 * 60 * 1000} //ms
    }),
//no re-sign-ins
    (req, res, next) => {
        if ((req.path === '/signin.html' || req.path === '/user/signin') &&
            req.session.user) {
            res.redirect('/bill.html');
        } else next();
    },
//enable the static resource access
    express.static('views'),
//filter all unauthenticated API calls.
    require('./verify'),
//enable parser
    bodyParser.json(), bodyParser.urlencoded({extended: true}));

//mount models
app.use('/user', require('./user/user'));
app.use('/bill', require('./bill/bill'));
app.use('/eat', require('./eat/eat'));
app.use('/employee', require('./employee/employee'));

//set our home page:)
app.all('*', (req, res) => {
    res.redirect('/signin.html');
});

app.use(require('./exception').reporter);

//start the server
var port = require('./config.json')['port'],
    server = http.createServer(app);
server.listen(port);
console.log('run server application at: ' + port);