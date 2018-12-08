const electron = require('electron');

const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;
const ipcMain = electron.ipcMain || electron.remote.ipcMain;

const url = require('url');
const path = require('path');

function InputPrompt (_label = 'Please enter a value', _placeholder = '', _icon = './icon.png') {
  return new Promise((resolve, reject) => {

    if (process.platform !== 'darwin') {
      let err = 'electron-osx-prompt is intended for use on macOS.';
      console.warn(err);
    }

    if (_icon == null) {
      _icon = './icon.png';
    }

    let promptWindow = new BrowserWindow({
      width: 450,
      height: 160,
      skipTaskbar: true,
      alwaysOnTop: true,
      backgroundColor: '#ECECEC',
      show: false,
      frame: false,
      resizable: false,
      parent: BrowserWindow.getFocusedWindow(),
      modal: true
    });

    promptWindow.setMenu(null);

    const promptUrl = url.format({
      protocol: 'file',
      slashes: true,
      pathname: path.join(__dirname, './prompt.html')
    });

    promptWindow.loadURL(promptUrl);

    let options = {
      label: _label.toString(),
      placeholder: _placeholder.toString(),
      icon: _icon.toString()
    };

    console.log(options.icon);

    promptWindow.webContents.on('did-finish-load', () => {
      promptWindow.webContents.send('electron-osx-prompt-settings', options);
      // promptWindow.webContents.openDevTools({ detach: true });
    });

    promptWindow.once('ready-to-show', promptWindow.show);

    const returnValue = (event, value) => {
      resolve(value);

      if (promptWindow) {
        promptWindow.close();
        promptWindow = null;
      }
    };

    ipcMain.on('electron-osx-prompt-return-value', returnValue);
  });
}

module.exports = InputPrompt;
