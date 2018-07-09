/**
 * Created by BoxCatGarden on 2018/6/10.
 */
var pool = require('../data'),
    mysql = require('mysql');

var model = module.exports = {

    //if has it, return 1; else 0
    has({i}, callback) {
        pool.query('select 0 from empl where emp_id=?',
            [i],
            (e, r) => callback(e, r && r.length));
    },

    /* return:
     * 0: fail;
     * 1: success;
     * 2: duplicate id */
    add({i, n, s, b, ph}, callback) {
        if (s < 0 || 2 < s)
            callback(new RangeError('Invalid s: s should between 0 and 2'));
        else
            pool.query('insert into empl values (?,?,?,?,?,default)',
                [i, n, s, b, ph],
                (e, r) => {
                    if (e)
                        if (e.code === 'ER_DUP_ENTRY') callback(0, 2);
                        else callback(e);
                    else callback(0, r.affectedRows);
                });
    },


    //if success, return 1; else 0
    modify({i, n, s, b, ph}, callback) {
        if (s < 0 || 2 < s)
            callback(new RangeError('Invalid s: s should between 0 and 2'));
        else
            pool.query('update empl set ? where tomb=0 and emp_id=?',
                [{
                    name: n || mysql.raw('name'),
                    sex: s || mysql.raw('sex'),
                    birthday: b || mysql.raw('birthday'),
                    phonenum: ph || mysql.raw('phonenum')
                }, i],
                (e, r) => callback(e, r && r.affectedRows));
    },


    //return the result-set; else if nm is 0, the total num
    query({i, n, st = 0, nm = 30}, callback) {
        var sql = 'select '+(nm?'emp_id,name,sex,birthday,phonenum':'count(*) as num')+' from empl where tomb=0';
        if (i) sql += ` and emp_id like ${mysql.escape('%' + i + '%')}`;
        if (n) {
            let s = '%';
            for (let c of n) {
                s += c + '%';
            }
            sql += ` and name like ${mysql.escape(s)}`;
        }
        if (nm) sql += ' limit ?,?';
        //console.log(sql);
        pool.query(sql, [st, nm], callback);
    },


    //if success, return 1; else return 0
    del({i}, callback) {
        pool.query('update empl set tomb=1 where emp_id=?', i,
            (e, r) => callback(e, r && r.affectedRows));
    }
};

/*model.query({
 i:'201003215142',
 //n: 'GG',
 s: 2,
 b:'1987-6-7',
 ph:'15325798546',
    //nm: 0
 }, (e, r, f) => {
 if (e) console.log(e.code);
 console.log(r);
 pool.end();
 });*/
/*module.exports.modify({
 i:'201003215146',
 b: '1983-5-7'
 }, (e,r,f)=>{
 pool.end();
 if (e) throw e;
 console.log(r);
 });*/
