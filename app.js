'use strict';

require('electron-debug')({enabled: true});
const { app, Menu, Tray, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow = null;
let tray = null;

const iconPath = path.join(__dirname, 'src', 'static', 'clock.ico');
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  createTray();
  createWindow();
});

const createTray = () => {
  tray = new Tray(iconPath);
  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', function(event) {
    toggleWindow();
  });
  tray.setToolTip('Elecron');
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 410,
    fullscreenable: false,
    //resizable: false,
    icon: iconPath,
    autoHideMenuBar: true,
  });
  mainWindow.loadURL('file://' + __dirname + '/src/index.html');

  mainWindow.on('minimize', function(event) {
    mainWindow.hide();
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
};

const toggleWindow = () => {
  mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
}