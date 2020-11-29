// Modules
const electron = require('electron')
const {app, BrowserWindow} = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {

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

    electron.powerMonitor.on('resume', e => {
        console.log(`system just woke back up!`, )
        if(!mainWindow) createWindow()  // if there's no mainWindow, call to createWindow()
    })
    electron.powerMonitor.on('suspend', e => {
        console.log(`Saving some data`, )  // save data before the computer goes to sleep
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
