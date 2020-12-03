// Modules
const {shell, Menu} = require('electron')

// Module function to create the main app menu
module.exports = (appWin) => {
  // menu template
  let template = [
    {
      label: 'Items',
      submenu: [
        {
          label: 'Add New',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // use the appWin instance for messaging
            appWin.send('menu-show-modal')
          },
        },
        {
          label: 'Open selected',
          accelerator: 'CmdOrCtrl+Enter',
          click: () => {
            appWin.send('menu-open-item')
          }
        },
        {
          label: 'Delete Item',
          accelerator: 'CmdOrCtrl+Backspace',
          click: () => {
            appWin.send('menu-delete-item')
          }
        },
        {
          label: 'Open in Browser',
          accelerator: 'CmdOrCtrl+Shift+Enter',
          click: () => {
            appWin.send('menu-open-item-in-default')
          }
        },
        {
          label: 'Search Items',
          accelerator: 'CmdOrCtrl+F',
          click: () => {
            appWin.send('menu-focus-search')
          }
        },
      ]
    },
    {role: 'editMenu'},
    {role: 'windowMenu'},
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn more',
          click: () => {
            shell.openExternal('http://philspelman.com')
          }
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