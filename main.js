// Modules
const {app, BrowserWindow, webContents} = require('electron')

const windowStateKeeper = require('electron-window-state')
let winState

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {

    mainWindow = new BrowserWindow({
        width: 900, height: 800,
        x: 0, y: 0,
        // width: winState.width, height: winState.height,
        // x: winState.x, y: winState.y,
        webPreferences: {nodeIntegration: true}
    })
    winState.manage(mainWindow)
    // Load index.html into the new BrowserWindow
    mainWindow.loadFile('index.html')

    // Open DevTools - Remove for PRODUCTION!
    // mainWindow.webContents.openDevTools();

    let wc = mainWindow.webContents  // assign a reference to the webContents object of the main window
    console.log(`webContents:`, webContents.getAllWebContents())


    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

// Electron `app` is ready
app.on('ready', e => {
    winState = windowStateKeeper({
        defaultWidth: 1000, defaultHeight: 800,
    })
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
