const { ipcRenderer } = require('electron');
const remote = require('electron').remote;

const path = require('path');

ipcRenderer.on('electron-osx-prompt-settings', (event, options) => {
    document.getElementById('label').innerHTML = options.label;
    document.getElementById('input').placeholder = options.placeholder;
    document.getElementById('prompt-img').src = options.icon;
});

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('input').focus();
});

function enter (e) {
    if (e.charCode == '13') {
        Ok();
    }
}

function Ok () {
    let returnValue = document.getElementById('input').value.toString();
    ipcRenderer.sendSync('electron-osx-prompt-return-value', returnValue);
}

function Cancel () {
    ipcRenderer.sendSync('electron-osx-prompt-return-value', null);
}
