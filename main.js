// Modules
const {app, BrowserWindow, dialog} = require('electron')

// Add the colors module
const colors = require('colors');
console.log(`colors: `, colors.rainbow("THESE ARE COLORS!"))

// note: you can use native node modules in the npm process
const bcrypt = require('bcrypt');
bcrypt.hash('myPlaintextPassword', 10, function (err, hash) {
    console.log(colors.rainbow(hash));
});

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

    // note: add the dialog here
    mainWindow.webContents.on('did-finish-load', () => {

        const answers = ['Yes', 'No', 'Maybe']
        dialog.showMessageBox({
            title: 'Message Box',
            message: 'Please select an option',
            detail: 'Message details.',
            buttons: answers,
        }).then( result => {
            console.log(`User selected ${answers[result.response]}`, )

        })

        // dialog.showSaveDialog({}).then( result => {
        //     console.log(`result: `, result)
        // })

        // dialog.showOpenDialog({
        //     buttonLabel: 'Select a photo',
        //     defaultPath: app.getPath('home'),
        //     options: ['multiSelection', 'createDirectory', 'openFile', 'openDirectory']
        // }).then( result => {
        //     console.log(`result: `, result)
        // })

        // dialog.showOpenDialog(mainWindow, {
        //     buttonLabel: 'Select a photo',
        //     defaultPath: app.getPath('home'),
        // }).then( result => {
        //     console.log(`result: `, result)
        // })
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
