// Modules
const {app, BrowserWindow, Menu, MenuItem} = require('electron')


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

// let mainMenu = new Menu()

let menuItem1 = new MenuItem({
    label: 'Electron',
    submenu: [
        {label: 'Item 1'},
        {label: 'Item 2', submenu: [{label: 'subItem 1'}]},
        {label: 'Item 3'},
    ]
})

// Note: we can use the buildFromTemplate method instead
let mainMenu = new Menu.buildFromTemplate(require('./mainMenu'))

// mainMenu.append(menuItem1)

// Create a new BrowserWindow when  `app` is ready
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

    Menu.setApplicationMenu(mainMenu)

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
