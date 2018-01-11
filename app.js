'use strict';

require('electron-debug')({enabled: true});
const { app, Menu, Tray, BrowserWindow } = require('electron');
const aboutWindow = require('about-window').default;
const path = require('path');

let mainWindow = null;
let tray = null;

const iconPath = path.join(__dirname, 'src', 'static', 'clock.ico');
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

const shouldQuit = app.makeSingleInstance((argv, workingDirectory) => {
  showWindow()
})
if (shouldQuit) app.quit()

const showWindow = () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  } else {
    createWindow()
  }
}
app.on('ready', function() {
  createMenu();
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
    height: 480,
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
};

const createMenu = () => {
  const iconPath = path.join(__dirname, 'src', 'static', 'clock-250.png');
  const menu = Menu.buildFromTemplate([
    {
      label: "about",
      click: () => aboutWindow({
        icon_path: iconPath,
        description: "scheduled web browsing",
        bug_report_url: "https://github.com/fourside/elecron/issues"
      })
    }
  ]);
  Menu.setApplicationMenu(menu);
};
