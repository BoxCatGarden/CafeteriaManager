/**
 * Created by BoxCatGarden on 2018/6/27.
 */
/* only for test */
function eat(empId, callback) {
    request200('POST', '/eat/u~.LnxtNthL9.SX8EEsJpL8-4SKJ5u6_',{i: empId, t: '20164as2235c'}, callback);
}

function eatingEmp(empId, month, year, type, start, num, callback) {
    request200('GET', '/eat/emp',{i: empId, m: month, y: year, tp: type, st: start, nm: num}, callback);
}

function eatingLog(empId, day, month, year, start, num, callback) {
    request200('GET', '/eat/log',{i: empId, d: day, m: month, y: year, st: start, nm: num}, callback);
}