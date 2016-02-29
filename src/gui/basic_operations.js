/**
 * Created by matteo on 23/02/16.
 */
var socketPlugin;

function load() {
    socketPlugin = require('./socket_plugin');
}

function write(ris) {
    document.getElementById('ris').innerHTML = ris;
}

function download() {
    var url = document.getElementById('url').value;
    write('I\'m downloading ' + url + '. Please wait.');
    socketPlugin.download(url, write);
}

function update() {
    var url = document.getElementById('url').value;
    write('I\'m updating ' + url + '. Please wait.');
    socketPlugin.update(url, write);
}

function removePlugin() {
    var url = document.getElementById('url').value;
    write('I\'m removing ' + url + '. Please wait.');
    socketPlugin.remove(url, write);
}

function run() {
    var url = document.getElementById('url').value;
    write('I\'m running ' + url + '. Please wait.');
    var list = document.getElementById('args').value;
    if (list != '') {
        var args = list.split(',');
        socketPlugin.run(url, args, write);
    } else {
        socketPlugin.run(url, write);
    }
}