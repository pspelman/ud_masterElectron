// Modules
const {ipcRenderer} = require('electron')

// DOM nodes
let showModal = document.getElementById('show-modal'),
  closeModal = document.getElementById('close-modal'),
  modal = document.getElementById('modal'),
  addItem = document.getElementById('add-item'),
  itemUrl = document.getElementById('url'),
  itemsDiv = document.getElementById('items')
  allItems = new Set(),
  exampleUrl = "https://placehold.it/500/500"


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

closeModal.addEventListener('click', e => {
  console.log(`hiding modal`,)
  clearUrlEntry();
  modal.style.display = 'none'
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
  // if (allItems.size !== allItems.add('new poo').size) {
  //   console.log('YES')
  // } else {
  //   console.log('NO')
  // }
  console.log(`all items: `, allItems)
  // create a new HTML element for the item
  // add the item to the existing page
}

// Handle new item
addItem.addEventListener('click', e => {
  if (itemUrl.value) {
    // add the URL to the list of URLs
    let newItem = itemUrl.value
    addNewItem(newItem)
    // clear the field
    clearUrlEntry();
    setTimeout(() => {
      alert(`${newItem} added to list`)
    }, 1)
  }
})
console.log(`all Items: `, allItems)
