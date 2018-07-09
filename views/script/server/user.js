/**
 * Created by BoxCatGarden on 2018/6/27.
 */
function signIn(userId, pwd, callback) {
    request200('POST', '/user/signin', {ui: userId, p: pwd}, callback);
}

function signOut() {
    request('POST', '/user/signout', {}, xhr => false);
}

function getUser(callback) {
    request200('GET', '/user', null, callback);
}
function setUser(userName, callback) {
    request200('POST', '/user/setinfo', {n: userName}, callback);
}

function changePwd(oldPwd, newPwd, callback) {
    request200('POST', '/user/chpwd', {op: oldPwd, np: newPwd}, callback);
}