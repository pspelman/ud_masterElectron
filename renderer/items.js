// DOM Nodes
let items = document.getElementById('items')

const addItemToDOM = (item) => {
  let itemNode = document.createElement('div')
  itemNode.addEventListener('click', this.select)
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

}

// set up local storage
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []
if (exports.storage) {
  exports.storage.forEach((item) => addItemToDOM(item))
}

// persist storage
exports.save = () => {
  localStorage.setItem('readit-items', JSON.stringify(this.storage))
};

exports.select = e => {
  // first remove any selected item
  console.log(`removing any selected items`, )
  document.getElementsByClassName('read-item selected')[0].classList.remove('selected')
  // add the clicked item
  console.log(`setting item to selected`, )
  // e.currentTarget.classList.add('selected')
}

exports.clearItems = () => {
  console.log(`clearing the items`, )
  items.innerHTML = ""
}

exports.showItems = items => {
  // clear the dom
  this.clearItems()
  items.forEach(item => addItemToDOM(item));
  // add each item in items to the DOM
}


// Add new item
exports.addItem = item => {
  // Create the new DOM node
  addItemToDOM(item);
  console.log(`pushing to storage`, )
  this.storage.push(item)
  console.log(`saving local storage`, )
  this.save()

}

