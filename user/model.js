/**
 * Created by BoxCatGarden on 2018/6/11.
 */
var pool = require('../data'),
    crypto = require('crypto'),

    encode = (p => p && crypto.createHash('md5').update(p).digest('hex'));

var model = module.exports = {

    //if success, return the User; else 0
    signIn({ui = '', p = ''}, callback) {
        //console.log(ui);
        pool.query('select * from user where user_id=?', ui,
            (e, r) => callback(e,
                (r && (r = r[0]) &&
                (!r.pwd || r.pwd === encode(p)) &&
                ({ //User
                    id: r.user_id,
                    name: r.name,
                    type: r.type
                })) || 0));
    },


    //if success, return 1; else 0
    changePwd(ui, {op = '', np = ''}, callback) {
        pool.query('update user set pwd=? where user_id=? and (pwd=? or pwd is null)',
            [encode(np), ui, encode(op)],
            (e, r) => callback(e, r && r.affectedRows));
    },


    //if success, return the User; else 0
    setUserProp(user, {n = ''}, callback) {
        if (user.name === n) //unchanged
            callback(0, user);
        else
            pool.query('update user set name=? where user_id=?', [n, user.id],
                (e, r) => {
                    if (e) callback(e);
                    else {
                        if (r.affectedRows)
                            user.name = n;  //update the value in memory, too
                        callback(0, r.affectedRows && user);
                    }
                });
    }
};

/*model.signIn({
 ui:'everlu',
 p:'123456'
 },(e,r,f)=>{
 console.log(e);
 console.log(r);
 //console.log(crypto.createHash('md5').update('123456').digest('hex'));
 pool.end();
 });*/
/*model.changePwd('everlu',{
 op:'abcd',
 np:'123456',
 name:'lu'
 }, (e,r,f)=>{
 console.log(e);
 console.log(r);
 pool.end();
 });*/
/*model.setUserProp({
 id: 'everlu',
 name: 'li',
 }, {name: 'lu'}, (e, r, f) => {
 console.log(e);
 console.log(r);
 pool.end();
 });*/