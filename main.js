// Modules
const {app, BrowserWindow, session} = require('electron')
const unhandled = require('electron-unhandled');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {

    // note: create a reference to the default session
    let ses = session.defaultSession

    mainWindow = new BrowserWindow({
        width: 900, height: 800,
        x: 0, y: 0,
        webPreferences: {nodeIntegration: true}
    })


    // Load index.html into the new BrowserWindow
    mainWindow.loadFile('index.html')

    ses.on('will-download', (e, downloadItem, webContents) => {
        console.log(`Starting download`,)
        let fileName = downloadItem.getFilename();
        let fileSize = downloadItem.getTotalBytes();

        console.log(`file: `, fileName)
        console.log(`size: `, fileSize)

        // note: set the save path to auto download on click
        downloadItem.setSavePath(app.getPath('desktop'), `/${fileName}`)
        let completed = false
        downloadItem.on('updated', (e, state) => {
            let received = downloadItem.getReceivedBytes()
            if (state === 'progressing' && received ) {  // note: check if it is progressing and if anything has been received
                let progress = Math.round((received / fileSize) * 100);
                if (!completed) {
                    console.log(`state: `, state, 'progress: ', progress)
                    webContents.executeJavaScript(`window.progress.value = ${progress}`)
                }
                if (progress >= 100) {
                    completed = true
                }
            }
        })
    })

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
