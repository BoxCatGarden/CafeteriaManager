/**
 * Created by BoxCatGarden on 2018/6/27.
 */
/* callback(xhr): if the return value is true, it prevents default behaviours */
function request(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (!callback(xhr) && xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 399) {
                window.location = xhr.response;
            }
        }
    };
    xhr.open(method , method === 'GET' ? url+urlencode(data) : url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    if (method === 'GET') {
        xhr.send(null);
    } else if (data instanceof FormData) {
        xhr.send(data);
    } else {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(data));
    }
}

function urlencode(data) {
    if (!data) return '';
    var s = [];
    for (var i in data) {
        if (data[i] !== undefined)
            s.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
    }
    //alert(s.join('&'));
    return '?' + s.join('&');
}

function request200(method, url, data, callback) {
    request(method, url, data, xhr => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            callback(JSON.parse(xhr.response));
        }
    });
}
