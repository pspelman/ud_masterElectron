// Modules
const {dialog} = require('electron')
const {autoUpdater} = require('electron-updater')  // Electron-Updater Module


// Configure log debugging
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

// Disable auto-downloading
autoUpdater.autoDownload = false

// Single export to check for and apply any available updates

module.exports = () => {
  // check for updates (GH Releases)
  console.log(`Checking for updates`)
  autoUpdater.checkForUpdates()  // this will now log its findings per the configuration
  // listen for update available
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'update available',
      message: 'an update for readIts is available. Download and install it now?',
      buttons: ['Update', 'No']
    }).then(result => {
      let buttonIndex = result.response
      // if the button index is 0, start the update
      if (buttonIndex === 0) autoUpdater.downloadUpdate().then(res => {
        console.log(`finished downloading update: `, res)
      }).catch(err => {
        console.log(`there was an error downloading the update: `, err)
      });
    })

  })

  // handle download finished
  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'ready to install',
      message: 'Install & relaunch now?',
      buttons: ['Yes', 'Later']
    }).then(result => {
      let buttonIndex = result.response
      // if the button index is 0, start the update
      if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true)
    })

  })


};