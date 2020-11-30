// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {remote} = require('electron')
const {dialog, BrowserWindow} = remote
setTimeout(() => {
  dialog.showMessageBox({
    // default to focused window
    message: 'Dialog from renderer',
    buttons: ['One', 'Two'],
  }).then(res => {
    console.log(`res:  `, res)
  })
}, 2000)


// use it to create a new browser window

setTimeout(() => {
  let win = new BrowserWindow({
    x: 50, y: 50, width: 300, height: 250,
  })
  win.loadFile('index.html')


  // can add a reference to the actual app from the main process
  // setTimeout(remote.app.quit, 2000)

  // can get reference to the main window and maximize it, for example
  let mainWindow = remote.getCurrentWindow()
  mainWindow.maximize()

}, 2000)