// Modules
const {ipcRenderer} = require('electron')
const items = require('./items.js')

// DOM nodes
let showModal = document.getElementById('show-modal'),
  closeModal = document.getElementById('close-modal'),
  modal = document.getElementById('modal'),
  addItem = document.getElementById('add-item'),
  itemUrl = document.getElementById('url'),
  itemsDiv = document.getElementById('items')
  allItems = new Set(),
  exampleUrl = "https://placehold.it/500/500"

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
  items.addItem(newItem)
  hideModal()
  toggleAddButton()

});
