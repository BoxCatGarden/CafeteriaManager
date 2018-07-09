/**
 * Created by BoxCatGarden on 2018/6/11.
 */
var pool = require('../data'),
    config = require('../config.json')['eat'];

var model = module.exports = {

    //if success, return 1; else 0
    add({i, t}, callback) {
        if (t !== config.token) { //invalid token
            callback(0, 0);
            return;
        }

        var date = new Date();
        if (canEat(date.getHours(), config.duration)) {
            pool.query('call addeat(?,?)', [i, date],
                (e, r) => callback(e, r && r.affectedRows));
            //invalid id or over-eat; done by the procedure
        } else callback(0, 0); //invalid time
    },


    //return the result-set; else if nm is 0, the total num
    queryEmp({i, m, y, tp, st = 0, nm = 30}, callback) {
        var sql = (nm?'':'select count(*) as num from (')+
            'select emp_id,name,sex,count(time) as num from empl natural left outer join (select * from eat';
        if (y || m) {
            sql += ' where';
            if (y) sql += ` extract(year from time)=${pool.escape(y)}` + (m ? ' and' : '');
            if (m) sql += ` extract(month from time)=${pool.escape(m)}`;
            //an interesting thing to query with month but without year
        }
        sql += ') as e where tomb=0';
        if (i) sql += ` and emp_id like ${pool.escape('%' + i + '%')}`;
        sql += ' group by emp_id,name,sex';
        if (tp) sql += ` having count(time)${tp == 1 ? '>' : '='}0`;
        sql += nm?' order by emp_id limit ?,?':') as t';
        //console.log(sql);
        pool.query(sql, [st, nm], callback);
    },


    //return the result-set; else if nm is 0, the total num
    queryLog({i, d, m, y, st = 0, nm = 30}, callback) {
        var sql = 'select '+(nm?'emp_id,name,sex,time':'count(*) as num')+' from empl natural join eat where tomb=0';
        if (i) sql += ` and emp_id like ${pool.escape('%' + i + '%')}`;
        if (y) sql += ` and extract(year from time)=${pool.escape(y)}`;
        if (m) sql += ` and extract(month from time)=${pool.escape(m)}`;
        if (d) sql += ` and extract(day from time)=${pool.escape(d)}`;
        if (nm) sql += ' order by time,emp_id desc limit ?,?';
        //console.log(sql);
        pool.query(sql, [st, nm], callback);
    }
};

function canEat(h, dur) {
    for (var i = 0; i < dur.length && (h < dur[i][0] || dur[i][1] <= h); ++i);
    return i < dur.length;
}

/*model.queryLog({
 //i: '20100321514',
 t: '20164as2235c',
 //y:2017,
 //m:6,
 //d:16
 //tp:1
    nm:0
 }, (e, r, f) => {
 console.log(e);
 console.log(r);
 pool.end();
 });*/