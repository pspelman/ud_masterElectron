// Modules
const {app, BrowserWindow, screen} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {

  console.log(screen)
  console.log(`primary display: `, screen.getPrimaryDisplay())

  let displays = screen.getAllDisplays();
  console.log(`all displays: `, displays)
  console.log(`screen[0] res: ${displays[0].size.width} x ${displays[0].size.height}`)
  console.log(`screen[0] bounds: ${displays[0].bounds.x} x ${displays[0].bounds.y}`)
  console.log(`screen[1]: ${displays[1].size.width} x ${displays[1].size.height}`)
  console.log(`screen[1] bounds: ${displays[1].bounds.x} x ${displays[1].bounds.y}`)
  console.log(`screen[2]: ${displays[2].size.width} x ${displays[2].size.height}`)
  console.log(`screen[2] bounds: ${displays[2].bounds.x} x ${displays[2].bounds.y}`)
  console.log(`screen[3]: ${displays[3].size.width} x ${displays[3].size.height}`)
  console.log(`screen[3] bounds: ${displays[3].bounds.x} x ${displays[3].bounds.y}`)

  screen.on('display-metrics-changed', (e, display, metricsChanged) => {
    console.log(`metrics changed: `, metricsChanged)
  })

  mainWindow = new BrowserWindow({
    width: 900, height: 800,
    x: 100, y: 100,
    webPreferences: {nodeIntegration: true}
  })

  setInterval( () => {
    console.log(`cursor position: `, screen.getCursorScreenPoint())
  }, 100)  // run this every 100ms

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
