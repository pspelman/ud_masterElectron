module.exports = [
    {
        label: 'Electron',
        submenu: [
            {label: 'Item 1'},
            {label: 'Item 2', submenu: [{label: 'Sub Item 1'}]},
            {label: 'Item 3'},
        ]
    },
    {
        label: 'customEdit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {role: 'copy'},
            {role: 'paste'},
        ]
    },
    {role: 'editMenu'},
    {
        label: 'Actions',
        submenu: [
            {
                label: 'Dev Tools',
                role: 'toggleDevTools',
            },
            {
                label: 'Action 2',
                enabled: false,
            },
            {
                role: 'toggleFullScreen'
            },
            {
                label: 'Greet',
                click: () => {
                    console.log(`hello from main menu`,)
                },
                accelerator: 'Shift+Alt+G'
            },
        ]
    }
]