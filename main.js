// Modules
const {app, BrowserWindow, Tray, Menu} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, tray

let trayMenu = Menu.buildFromTemplate([
  {label: 'Item 1'},
  {role: 'quit'},
])

function createTray() {
  tray = new Tray('trayTemplate@2x.png')
  tray.setToolTip('Tray details')
  tray.on('click', e => {
    if (e.shiftKey) {  // check for modifier key - if shift key is held down during the click, quit
      app.quit();
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();  // Note: this will toggle the visibility of the main window from tray icon click
    }
  })
  tray.setContextMenu(trayMenu)
}


// Create a new BrowserWindow when `app` is ready
function createWindow() {
  // create the tray icon
  createTray()

  mainWindow = new BrowserWindow({
    width: 900, height: 800,
    x: 0, y: 0,
    webPreferences: {nodeIntegration: true}
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', e => {
  createWindow();
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
