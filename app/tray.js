const templateGenerator = require('../template')
const { Menu } = require('electron')

module.exports = {
    renderTray(tray = mainTray, win) {
        let template = templateGenerator.geraTrayTemplate(win);
        const contextMenu = Menu.buildFromTemplate(template)

        // contextMenu.items[1].checked = true
        tray.setContextMenu(contextMenu)

        tray.on('click', tray.popUpContextMenu);
    }
}