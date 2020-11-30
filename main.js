// Modules
const {app, BrowserWindow, ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {

    mainWindow = new BrowserWindow({
        width: 900, height: 800,
        x: 100, y: 140,
        webPreferences: {nodeIntegration: true}
    })

    // Load index.html into the new BrowserWindow
    mainWindow.loadFile('index.html')

    // Open DevTools - Remove for PRODUCTION!
    mainWindow.webContents.openDevTools();

    mainWindow.webContents.on('did-finish-load', e => {  // send a message to the renderer once the mainWindow is done loading
        let rayMsg = {
            from: 'Ray',
            message: 'I am Ray... this is mail.',
            priority: 1,
        }
        mainWindow.webContents.send('mailbox', 'Sent to mailbox from MAIN.js --> You have mail')
        mainWindow.webContents.send('mailbox', rayMsg)
    })

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

ipcMain.on('channel1', (e, args) => {
    console.log(`IPC event args: `, args)
    e.sender.send('channel1-response', 'ACK: Message received on channel1')
})

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
