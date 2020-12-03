// DOM Nodes
let items = document.getElementById('items')

// set up local storage
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []

// persist storage
exports.save = () => {
  localStorage.setItem('readit-items', JSON.stringify(this.storage))
};

exports.select = e => {
  // first remove any selected item
  console.log(`removing any selected items`)
  if (e.currentTarget.classList.contains('selected')) {
    e.currentTarget.classList.remove('selected')
    return
  }

  try {
    document.getElementsByClassName('read-item selected')[0].classList.remove('selected')
  } catch (e) {}
  // add the clicked item
  e.currentTarget.classList.add('selected')
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


/*
  // Create the new DOM node
  let itemNode = document.createElement('div')
  itemNode.addEventListener('click', () => select(itemNode))
  // itemNode.addEventListener('click', () => itemNode.classList.add('selected'))
  // assign the read-item class
  itemNode.setAttribute('class', 'read-item')
  itemNode.innerHTML = `<img src="${item.screenshot}" alt="placeholder for ${item.url}"> <h2>${item.title}</h2>`

  // add the new node to the other "items"
  // itemNode.addEventListener('click', () => console.log(`clicked ${itemNode.innerHTML}`, )
  // )
  items.appendChild(itemNode);
  // if it is the first item, select it
  // if (document.getElementsByClassName('read-item').length === 1) {
  //   itemNode.classList.add('selected')
  // }
*/
// Add new item
exports.addItem = (item, newItem = false) => {
  // new item node
  let itemNode = document.createElement('div')

  // attach a click listener to select / unselect
  itemNode.addEventListener('click', this.select)

  // add HTML for the class and content
  itemNode.setAttribute('class', 'read-item')
  itemNode.innerHTML = `<img src="${item.screenshot}" alt="placeholder for ${item.url}"> <h2>${item.title}</h2>`

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
