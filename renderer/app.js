// Modules
const {ipcRenderer} = require('electron')
const items = require('./items.js')

// DOM nodes
let showModal = document.getElementById('show-modal'),
  closeModal = document.getElementById('close-modal'),
  clrItems = document.getElementById('clear-items'),
  modal = document.getElementById('modal'),
  addItem = document.getElementById('add-item'),
  itemUrl = document.getElementById('url'),
  itemsDiv = document.getElementById('items'),
  search = document.getElementById('search'),
  allItems = new Set(),
  exampleUrl = "https://placehold.it/500/500"

function checkForTerm(itemEntry, searchTerm) {
  let containsSearch = itemEntry['title'].toLowerCase().indexOf(searchTerm.toLowerCase());
  console.log(`indexOf(${searchTerm}): ${containsSearch}`)
  return containsSearch > -1
}

function phils_first_solution() {
  let stuff = items.storage.filter(item => checkForTerm(item, search.value))
  console.log(`entries with the search term: `, stuff)
  if (stuff.length) {
    items.showItems(stuff);
  } else {
    items.showAllItems()
  }
}

// listen and filter the search bar
search.addEventListener('keyup', e => {
  // console.log(`going to filter entries for `, search.value)
  Array.from(document.getElementsByClassName('read-item')).forEach( item => {
    let hasMatch = item.innerText.toLowerCase().includes(search.value)
    item.style.display = hasMatch ? 'flex' : 'none'  // this will set the display to NONE if hasMatch is false and flex if it is true
  })
  // phils_first_solution();

})

// enable / disable submission buttons
const toggleAddButton = () => {
  // check state
  if (addItem.disabled) {
    // enable
    addItem.disabled = false
    addItem.style.opacity = 1
    addItem.innerText = 'Add Item'
    closeModal.style.display = 'inline'
  } else {
    // disable
    addItem.disabled = true
    addItem.style.opacity = 0.5
    addItem.innerText = 'Adding...'
    closeModal.style.display = 'none'
  }
}

function clearUrlEntry() {
  itemUrl.value = ""
}

// Modal interaction
itemUrl.addEventListener('keyup', e => {  // allow enter key to trigger add
  if (e.key === 'Enter') addItem.click()
})

// Navigate item selection with up/down arrows
document.body.addEventListener('keyup', e => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    items.changeSelection(e.key)
  }
});

showModal.addEventListener('click', e => {
  modal.style.display = 'flex'
  itemUrl.focus()  // note: focus on the input
})

function hideModal() {
  console.log(`hiding modal`,)
  clearUrlEntry();
  modal.style.display = 'none'
}

closeModal.addEventListener('click', e => {
  hideModal();
})

clrItems.addEventListener('click', ev => {
  items.clearItems()
})

function addItemToPage(newItem) {
  let newDiv = `
        <div class="read-item">
          <img src="${newItem}" alt="placeholder for ${newItem}">
          <h2>${newItem}</h2>
        </div>`
  itemsDiv.innerHTML += newDiv
}

function addNewItem(newItem) {
  console.log(`adding: `, newItem)
  // add the item to the list of items
  if (allItems.size !== allItems.add(newItem).size) {
    console.log(`a new item was added | creating the HTML`, );
    addItemToPage(newItem)
  }
  console.log(`all items: `, allItems)
  // create a new HTML element for the item
  // add the item to the existing page
}

// Handle new item
addItem.addEventListener('click', e => {

  if (itemUrl.value) {
    // add the URL to the list of URLs
    toggleAddButton()
    // Note: use IPC to add item via the main process
    let newItem = itemUrl.value
    ipcRenderer.invoke('new-item', newItem)
    // NOTE: this would be to handle adding in the renderer only:
    // addNewItem(newItem)
    // // clear the field
    clearUrlEntry();
    // setTimeout(() => {
    //   alert(`${newItem} added to list`)
    // }, 1)
  }

})

// listen for new item from main process
ipcRenderer.on('new-item-success', (e, newItem) => {

  // Now that the new item has been created, pass to the items module to handle
  items.addItem(newItem, true)
  hideModal()
  toggleAddButton()

});

// listen for menu message from main
ipcRenderer.on('menu-show-modal', () => showModal.click());
ipcRenderer.on('menu-open-item', () => items.openItem());
ipcRenderer.on('menu-focus-search', () => search.focus());
ipcRenderer.on('menu-delete-item', () => {
  let selectedItem = items.getSelectedItem()
  items.delete(selectedItem.index)
})
ipcRenderer.on('menu-open-item-in-default', () => {
  // let selectedItem = items.getSelectedItem()
  items.openNative()
});