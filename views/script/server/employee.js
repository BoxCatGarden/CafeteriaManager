/**
 * Created by BoxCatGarden on 2018/6/27.
 */
function hasEmp(empId, callback) {
    request200('GET', '/employee/has',{i: empId}, callback);
}

function addEmp(empId, empName, sex, birth, phone, callback) {
    request200('POST', '/employee/add',{i: empId, n: empName, s: sex, b: birth, ph: phone}, callback);
}

function modifyEmp(empId, empName, sex, birth, phone, callback) {
    request200('POST', '/employee/mod',{i: empId, n: empName, s: sex, b: birth, ph: phone}, callback);
}

function queryEmp(empId, empName, start, num, callback) {
    request200('GET', '/employee',{i: empId, n: empName, st: start, nm: num}, callback);
}

function deleteEmp(empId, callback) {
    request200('POST', '/employee/del',{i: empId}, callback);
}