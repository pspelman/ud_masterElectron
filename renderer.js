// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');
let i = 1
setInterval(() => {
  console.log(`${i}`, )
  i++
}, 1000)

document.getElementById('talk').addEventListener('click', ev => {
  // we will send a message to the main process
  // console.log(`going to talk to main process through IPC`,)
  // ipcRenderer.send('channel1', 'Hello from main window!')  // this one is for async
  console.log(`waiting for response`, )
  let response = ipcRenderer.sendSync('sync-message', 'SYNC MESSAGE -- waiting for response')  // this one is for sync
  console.log(`response: `, response)
})

ipcRenderer.on('channel1-response', (event, args) => {
  console.log(`got a response: `, args)
})

ipcRenderer.on('mailbox', (event, args) => {
  console.log(`[renderer.js] got mailbox mail: `, args)
  })