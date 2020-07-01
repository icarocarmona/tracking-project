const { resolve } = require('path');
const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron')
const data = require('./data')
const templateGenerator = require('./template')

// Menu
const appMenu = require('./app/menu')('')

// Tary 
const tray = require('./app/tray')

let mainTray = {};
let mainWindow = null;

app.on('ready', () => {
    console.log('Aplicação Iniciando');
    console.log(app.getLocale());
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,

        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)

    mainTray = new Tray(resolve(__dirname, 'app/img', 'IconTray.png'))
    tray.renderTray(mainTray, mainWindow)

    Menu.setApplicationMenu(appMenu)

    globalShortcut.register('CmdOrCtrl+Alt+P', () => {
        mainWindow.send('shortcut-play-stop')
    })
})

//close app in system
app.on('window-all-closed', () => {
    app.quit()
})

//this const is used to maintain only one window about 
let aboutWindow = null;
ipcMain.on('open-about', () => {
    if (aboutWindow == null) {
        let aboutWindow = new BrowserWindow({
            width: 300,
            height: 225,
            alwaysOnTop: true,
            backgroundColor: '#F5F5F5',
            parent: mainWindow,
            modal: true,
            webPreferences: {
                nodeIntegration: true
            }
        })
        aboutWindow.setMenuBarVisibility(false)
        aboutWindow.loadURL(`file://${__dirname}/app/about.html`)
        aboutWindow.once('ready-to-show', () => {
            child.show()
        })
        aboutWindow.on('closed', function () {
            aboutWindow = null
        })
    }

})

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`)
    data.salvaDados(curso, tempoEstudado)
})

ipcMain.on('curso-adicionado', (event, novoCurso) => {
    let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, mainWindow);
    let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
    mainTray.setContextMenu(novoTrayMenu);
})


