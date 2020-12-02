// Modules
const {BrowserWindow} = require('electron')

// Offscreen BrowserWindow
let offscreenWindow

// Exported readItem function
module.exports = (url, callback) => {
  console.log(`trying to get `, url)

  // create offscreen window
  offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true
    }
  })

  // get the screenshot
  offscreenWindow.loadURL(url)
  console.log(`trying to load URL`, )
  console.log(`loading: `, offscreenWindow.webContents.isLoading())


  // when loaded, prepare the item to be returned
  offscreenWindow.webContents.on('unresponsive', e => {
    console.log(`the shit is unresponsive`, )
  })
  offscreenWindow.webContents.on('did-finish-load', e => {
    console.log(`FINISHED LOADING WEB CONTENTS`, )

    let title = offscreenWindow.getTitle()


    // get the screenshot (thumbnail)
    offscreenWindow.webContents.capturePage().then(image => {
      // get the image as a dataURL
      let screenshot = image.toDataURL()

      // Execute callback with the new item object
      callback({title, screenshot, url})

      // cleanup
      offscreenWindow.close()
      offscreenWindow = null
    })
  })
}

