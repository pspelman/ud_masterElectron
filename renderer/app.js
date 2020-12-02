// DOM nodes
let showModal = document.getElementById('show-modal'),
  closeModal = document.getElementById('close-modal'),
  modal = document.getElementById('modal'),
  addItem = document.getElementById('add-item'),
  itemUrl = document.getElementById('url'),
  items = new Set()



function clearUrlEntry() {
  itemUrl.value = ""
}

// Modal interaction
itemUrl.addEventListener('keyup', e => {  // allow enter key to trigger add
  if(e.key === 'Enter') addItem.click()
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


// Handle new item
addItem.addEventListener('click', e => {
  if (itemUrl.value) {
    // add the URL to the list of URLs
    let newItem = itemUrl.value
    console.log(`adding: `, newItem)
    // clear the field
    clearUrlEntry();
    setTimeout(()=>{
      alert(`${newItem} added to list`)
    }, 1)
  }
})