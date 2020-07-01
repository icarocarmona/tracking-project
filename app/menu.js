const {app, Menu, ipcMain} = require('electron')


function geraMenuPrincipalTemplate(config) {
    const locale = require('./resources/languages/pt-BR')
    let templateMenu = [
        {
            label: `&` + locale['view'],
            submenu: [
                {
                    label: `&` + locale['view.reload'],
                    role: 'reload'
                },
                {
                    label: locale['view.devtools'],
                    role: 'toggledevtools'
                }
            ]
        },
        {
            label: locale['window'],
            submenu: [
                { role: 'minimize' },
                { role: 'close' }
            ]
        },
        {
            label: locale['about'],
            submenu: [
                {
                    label: locale['about.system'],
                    accelerator: 'CommandOrControl+I',
                    click: () => {
                        ipcMain.emit('open-about');
                    }
                },
                {
                    label: locale['about.read_more'],
                    click: async () => {
                        const { shell } = require('electron')
                        await shell.openExternal('https://github.com/icarocarmona/tracking-project')
                    }
                }
            ]
        }
    ];
    if (process.platform == 'darwin') {
        templateMenu.unshift(
            {
                label: app.getName(),
                submenu: [
                    {
                        role: 'quit'
                    }
                ]
            }
        )
    }
    return templateMenu
}

module.exports = function (config) {

    let templateMenu = geraMenuPrincipalTemplate(config)

    return Menu.buildFromTemplate(templateMenu)
}