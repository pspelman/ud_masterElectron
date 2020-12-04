// Modules
const {app, BrowserWindow, ipcMain, TouchBar} = require('electron')
const windowStateKeeper = require('electron-window-state')
const readItem = require('./readItem.js')
const appMenu = require('./menu.js')
// UPDATER
const updater = require('./updater.js')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Touchbar Label
const tbLabel = new TouchBar.TouchBarLabel({
  label: 'ReadIts',
})

const tbTheme = new TouchBar.TouchBarLabel({
  label: 'Theme',
})

// Touchbar button
const tbAddNew = new TouchBar.TouchBarButton({
  label: 'new readIt',
  backgroundColor: '#0595DE',
  click: () => {
    mainWindow.send('menu-show-modal')
  }
})

// DevTools button
const tbDevTools = new TouchBar.TouchBarButton({
  label: 'DevTools',
  icon: `${__dirname}/file-code-solid@2x.png`,
  iconPosition: 'left',
  click: () => {
    mainWindow.webContents.toggleDevTools()
  }
})

// Touchbar Color Picer
const tbPicker = new TouchBar.TouchBarColorPicker({
  change: color => {
    mainWindow.send('menu-set-background-color', {color: color})
    mainWindow.webContents.insertCSS(`body {background-color: ${color};}`)
  }
})

// Touchbar Slider
const tbSlider = new TouchBar.TouchBarSlider({
  label: 'Size',
  minValue: 500,
  maxValue: 1000,
  value: 500, // this is the initial value
  change: val => {
    console.log(`trying to change the size of the window to ${val}`, )
    mainWindow.setSize(val, val, true)  // true value makes the window resizing smoother
  }
})

const tbPopover = new TouchBar.TouchBarPopover({
  label: 'Size',
  items: new TouchBar({
    items: [tbSlider]
  })
})

// touchbar spacers
const tbSpacerSM = () => new TouchBar.TouchBarSpacer({size: 'small'})
const tbSpacerLG = () => new TouchBar.TouchBarSpacer({size: 'large'})
const tbSpacerFLX = () => new TouchBar.TouchBarSpacer({size: 'flexible'})

// Create the new touchbar
const touchbar = new TouchBar({
  items: [
    tbLabel,
    tbSpacerLG(),
    tbTheme,
    tbPicker,
    // tbSlider,
    tbPopover,
    tbSpacerFLX(),
    tbAddNew,
    tbSpacerSM(),
    tbDevTools,
  ],  // touchbar components created from touchbar submodules
  // escapeItem: null  // Note: this is for the case where the Escape key on the touchbar is to be replaced
})

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
  if (process.platform === 'darwin') mainWindow.setTouchBar(touchbar)

  // Load main.html into the new BrowserWindow
  mainWindow.loadFile('renderer/main.html')

  // Set touchbar on Mac

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
