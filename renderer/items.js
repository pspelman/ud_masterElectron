// Modules
const fs = require('fs')

// DOM Nodes
let items = document.getElementById('items')

// Get readerJS script
// let readerJS = require('./reader.js')  // NOTE: this is WRONG --> it will run the script
let readerJS
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
  readerJS = data.toString()
})


window.addEventListener('message', e => {  // Note: Listen for a "done" message from the reader window
  console.log(`window got a message: `, e.data)
  // need to tell it which item we're trying to delete
  this.delete(e.data.itemIndex)

  // Close the caller (the reader window)
  e.source.close()
})


exports.delete = itemIndex => {
  console.log(`trying to delete node at index `, itemIndex)
  console.log(`going to try to remove`, items.childNodes.item(itemIndex))
  this.storage.splice(itemIndex, 1)  // remove the item from the storage

  items.removeChild(items.childNodes.item(itemIndex))

  this.save()  // then persist the storage

  // Select the previous item or new top item
  if (this.storage.length) {
    // get the new selected item index
    let newSelectedIndex = (itemIndex === 0) ? 0 : itemIndex - 1  // this will select the 0th item, or go 1 up
    // select item at new index
    document.getElementsByClassName('read-item')[newSelectedIndex].classList.add('selected')
  }
}

// set up local storage
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []

// persist storage
exports.save = () => {
  localStorage.setItem('readit-items', JSON.stringify(this.storage))
};

let lastSelect = new Date()
exports.select = e => {
  // first remove any selected item
  // lastSelect = !lastSelect ? new Date() : lastSelect  // initialize with the first select
  if (new Date() < lastSelect.setMilliseconds(lastSelect.getMilliseconds() + 500)) {  // note: trying to 'debounce' a double click since I implemented select and unselect
    console.log(`debounce - NOT SELECTING`,)
    return
  }
  console.log(`last select: ${lastSelect}`, )
  console.log(`new select: ${new Date()}`, )
  lastSelect = new Date()
  console.log(`removing any selected items`);
  if (e && e.currentTarget.classList.contains('selected')) {
    e.currentTarget.classList.remove('selected')
    return
  }
  try {
    this.getSelectedItem().node.classList.remove('selected')
  } catch (e) {}
  // add the clicked item
  e.currentTarget.classList.add('selected')
}

exports.changeSelection = keyPress => {
  console.log(`${keyPress} was pressed --> changing selection`, )
  let selectedItem = this.getSelectedItem().node
  if (!selectedItem) {
    // nothing is selected --
    // downArrow start at top
    if (keyPress === 'ArrowDown') {
      console.log(`select starting at TOP`,);
    } else if (keyPress === 'ArrowUp') {
      console.log(`select starting at BOTTOM`,);
    }
  } else {
    // something is already selected
    if (keyPress === 'ArrowDown' && selectedItem.nextElementSibling) {
      selectedItem.classList.remove('selected')
      selectedItem.nextElementSibling.classList.add('selected')
    } else if (keyPress === 'ArrowUp'&& selectedItem.previousElementSibling) {
      selectedItem.classList.remove('selected')
      selectedItem.previousElementSibling.classList.add('selected')
    }
  }
}


exports.getSelectedItem = () => {
  let currentItem = document.getElementsByClassName('read-item selected')[0];
  // return currentItem

  // get the item index
  let itemIndex = 0
  let child = currentItem
  while ((child = child.previousElementSibling) != null) itemIndex++  // this will cleverly walk its way up the nodes, counting
  return {node: currentItem, index: itemIndex}
}

// function getSelectedItem() {
//   // get selected item
//   let currentItem = document.getElementsByClassName('read-item selected')[0];
//   // return currentItem
//
//   // get the item index
//   let itemIndex = 0
//   let child = currentItem
//   while ((child = child.previousElementSibling) != null) itemIndex++  // this will cleverly walk its way up the nodes, counting
//   return {node: currentItem, index: itemIndex}
// }

exports.openItem = () => {
  if (!this.storage.length) return  // prevent trying this if there are no items

  // get the selected item
  let selectedItem = this.getSelectedItem()

  // get the item URL
  let contentURL = selectedItem.node.dataset.url

  console.log(`opening item: `, contentURL)
  // OPEN the item in a BrowserWindow instance
  // let readerWin = window.open(contentURL)  // this version is basic and does not turn off node integration / does not change window sizing
  let readerWin = window.open(contentURL, '', `
  maxWidth=2000, 
  maxHeight=2000,
  width=1200,
  height=800,
  backgroundColor=#DEDEDE,
  nodeIntegration=0,
  contextIsolation=1
  `)

  // inject custom scripts to run
  // readerWin.eval(`alert('Hello from items.js!')`)
  // NOTE: Inject JavaScript with specific selected item index (selectedItem.index)
  readerWin.eval(readerJS.replace('"{{index}}"', selectedItem.index))

}

exports.clearItems = () => {
  console.log(`clearing the items`, )
  items.innerHTML = ""
}

exports.showItems = items => {
  // clear the dom
  this.clearItems()
  // items.forEach(item => addItemToDOM(item));
  items.forEach(item => this.addItem(item));
  // add each item in items to the DOM
}


// Add new item
exports.addItem = (item, newItem = false) => {
  // new item node
  let itemNode = document.createElement('div')

  // add HTML for the class and content
  itemNode.setAttribute('class', 'read-item')
  itemNode.setAttribute('data-url', item.url)
  itemNode.innerHTML = `<img src="${item.screenshot}" alt="placeholder for ${item.url}"> <h2>${item.title}</h2>`

  // attach a click listener to select / unselect
  itemNode.addEventListener('click', this.select)

  // attach a double click listener for opening the link
  itemNode.addEventListener('dblclick', this.openItem)

  // add it to the other items
  items.appendChild(itemNode)

  // if it's the first one, default select it
  if (document.getElementsByClassName('read-item').length === 1) {
    itemNode.classList.add('selected')
  }

  // only save if it is new
  console.log(`pushing to storage`,);
  if (newItem) {
    this.storage.push(item);
    console.log(`saving local storage`,)
    this.save()
  }
};

if (exports.storage) {
  // exports.storage.forEach((item) => addItemToDOM(item))
  exports.storage.forEach((item) => this.addItem(item, false))
}
