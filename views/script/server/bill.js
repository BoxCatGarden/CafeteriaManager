/**
 * Created by BoxCatGarden on 2018/6/27.
 */
function geneBill(month, year, type, start, num, callback) {
    request200('GET', '/bill', {m: month, y: year, tp: type, st: start, nm: num}, callback);
}

function checkBill(month, year, userId, pwd, callback) {
    request200('POST', '/bill/check', {m: month, y: year, ui: userId, p: pwd}, callback);
}