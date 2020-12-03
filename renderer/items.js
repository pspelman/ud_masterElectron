// DOM Nodes
let items = document.getElementById('items')

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
  if (e.currentTarget.classList.contains('selected')) {
    e.currentTarget.classList.remove('selected')
    return
  }
  try {
    getSelectedItem().classList.remove('selected')
  } catch (e) {}
  // add the clicked item
  e.currentTarget.classList.add('selected')
}

exports.changeSelection = keyPress => {
  console.log(`${keyPress} was pressed --> changing selection`, )
  let selectedItem = getSelectedItem()
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

function getSelectedItem() {
  return document.getElementsByClassName('read-item selected')[0];
}

exports.openItem = () => {
  if (!this.storage.length) return  // prevent trying this if there are no items

  // get the selected item
  let selectedItem = getSelectedItem()

  // get the item URL
  let contentURL = selectedItem.dataset.url

  console.log(`opening item: `, contentURL)


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
