/**
 * Created by BoxCatGarden on 2018/6/11.
 */
var pool = require('../data'),
    user = require('../user/model');

var model = module.exports = {

    //return the result-set; else if nm is 0, the total num
    gene({m, y, tp, st = 0, nm = 30}, callback) {
        var sql = (nm?'':'select count(*) as num from (')+
            'select extract(year from time) as year, extract(month from time) as month,' +
            `count(*)*${require('../config.json')['eat'].fee} as amt` +
            ',check_time,user_id as checker ' +
            'from eat left outer join bill ' +
            'on extract(year from time)=bill_year and extract(month from time)=bill_month ' +
            'group by year,month,check_time,checker';
        if (y || m || tp) sql += ' having';
        if (y) sql += ` year=${pool.escape(y)}`;
        if (m) sql += (y ? ' and' : '') + ` month=${pool.escape(m)}`;
        if (tp) sql += (y || m ? ' and' : '') + ` checker is${tp == 1 ? ' not' : ''} null`;
        sql += nm?' order by year,month desc limit ?,?':') as t';
        //console.log(sql);
        pool.query(sql, [st, nm], callback);
    },


    /* return:
     * 0: fail to add the bill;
     * 1: success;
     * 2: fail to sign in
     */
    check({m, y, ui, p}, callback) {
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1;
        if (y > year || m < 1 || 12 < m || (y === year && m >= month)) //invalid month
            callback(new RangeError('Unexpected value(s) of y or m.'));
        else
            user.signIn({ui: ui, p: p}, (e, r) => {
                if (e || !r) callback(e, 2);
                else pool.query('insert into bill values (?,?,?,?)', [y, m, date, ui],
                    (e, r) => callback(e, r && r.affectedRows));
            });
    }
};

/*model.gene({
 y:2018,
 //m:4,
 ui:'everlu',
 //tp:1
    nm:30
 },(e,r,f)=>{
 console.log(e);
 console.log(r);
 pool.end();
 });*/