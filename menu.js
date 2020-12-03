// Modules
const {shell, Menu} = require('electron')

// Module function to create the main app menu
module.exports = () => {
  // menu template
  let template = [
    {
      label: 'Items',
      submenu: []
    },
    {role: 'editMenu'},
    {role: 'windowMenu'},
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn more',
          click: () => {shell.openExternal('http://philspelman.com')}
        }
      ]
    },
  ]

  // create macOS menu
  if (process.platform === 'darwin') template.unshift({role: 'appMenu'})  // appMenu is used by Electron to make the Mac menu


  // build the menu
  let menu = Menu.buildFromTemplate(template);

  // set as the main app menu
  Menu.setApplicationMenu(menu)

}