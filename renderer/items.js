// DOM Nodes
let items = document.getElementById('items')

// Add new item
exports.addItem = item => {
  // Create the new DOM node
  let itemNode = document.createElement('div')

  // assign the read-item class
  itemNode.setAttribute('class', 'read-item')
  itemNode.innerHTML = `<img src="${item.screenshot}" alt="placeholder for ${item.url}"> <h2>${item.title}</h2>`

  // add the new node to the other "items"
  items.appendChild(itemNode)

}