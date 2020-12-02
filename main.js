// Modules
const {app, BrowserWindow, ipcMain} = require('electron')
const windowStateKeeper = require('electron-window-state')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// listen for new item request
ipcMain.handle('new-item', (e, itemUrl) => {
  console.log(`trying to add new value: `, itemUrl)

  // get the new item and send back
  setTimeout(() => {
    e.sender.send('new-item-success', 'here is the new item!')
  }, 2000)

});


// Create a new BrowserWindow when `app` is ready
function createWindow() {

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

  // Load main.html into the new BrowserWindow
  mainWindow.loadFile('renderer/main.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

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
