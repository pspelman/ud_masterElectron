const fs = require('fs')
const {ipcRenderer} = require('electron')

// want to write to desktop
// could get the location via IPC
let desktopPath
ipcRenderer.invoke('desktop-path').then(path => {
  desktopPath = path
})

window.writeToFile = text => {
  console.log(`[preload.js] trying to write to file: `, text)
  fs.writeFile(`${desktopPath}/app.txt`, text, console.log)
}

window.versions = {
  electron: process.versions.electron,
  node: process.versions.node,
}
