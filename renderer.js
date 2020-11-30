// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');

document.getElementById('talk').addEventListener('click', ev => {
  // we will send a message to the main process
  console.log(`going to talk to main process through IPC`,)
  ipcRenderer.send('channel1', 'Hello from main window!')
})

ipcRenderer.on('channel1-response', (event, args) => {
  console.log(`got a response: `, args)
})

ipcRenderer.on('mailbox', (event, args) => {
  console.log(`[renderer.js] got mailbox mail: `, args)
  })