// Note: Create a button in remote content to mark item as "Done"
let readitClose = document.createElement('div')
readitClose.innerText = 'Done'

// Note: Style the button
readitClose.style.position = 'fixed'
readitClose.style.bottom = '15px'  // tip: use px instead of % or there can be issues related to the remote content sizing
readitClose.style.right = '15px'
readitClose.style.padding = '5px 10px'
readitClose.style.fontSize = '20px'
readitClose.style.fontWeight = 'bold'
readitClose.style.background = 'dodgerblue'
readitClose.style.color = 'white'
readitClose.style.borderRadius = '5px'
readitClose.style.cursor = 'default'
readitClose.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.2)'
readitClose.style.zIndex = '9999'
readitClose.style.cursor = 'pointer'

// add a click listener to the button
readitClose.onclick = e => {
  // this.window.close()
  // use HTML5 window messaging to send a message back to the main window
  // window.opener.postMessage('item-done', '*')
  window.opener.postMessage({
    action: 'delete-reader-item',
    itemIndex: "{{index}}"
  }, "*")
}


// append button to the body of the content
// document.getElementsByTagName("body")[0].appendChild(readitClose)  // Note: This will cause an IPC error b/c the node is a nonstandard JavaScript object and cannot be serialized
document.getElementsByTagName("body")[0].append(readitClose)  // Note: this gets around the IPC error

