// Modules
const {app, BrowserWindow, ipcMain} = require('electron')
const windowStateKeeper = require('electron-window-state')
const readItem = require('./readItem.js')
const appMenu = require('./menu.js')
// UPDATER
const updater = require('./updater.js')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// listen for new item request
ipcMain.handle('new-item', (e, itemUrl) => {
  console.log(`trying to add new value: `, itemUrl)
  readItem(itemUrl, item => {  // get the new item and send back
    e.sender.send('new-item-success', item)
  })
});


// Create a new BrowserWindow when `app` is ready
function createWindow() {

  // Check for app updates after 3 seconds
  setTimeout(updater, 3000)


  let state = windowStateKeeper({
    defaultWidth: 500, defaultHeight: 650,
  })

  mainWindow = new BrowserWindow({
    x: state.x, y: state.y,
    width: state.width, height: state.height,
    minWidth: 350, maxWidth: 650,
    minHeight: 300,
    webPreferences: {nodeIntegration: true}
  })

  // create the app menu
  appMenu(mainWindow)

  // Load main.html into the new BrowserWindow
  mainWindow.loadFile('renderer/main.html')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  state.manage(mainWindow)  // tell the state keeper it is supposed to be keeping track of this window
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
