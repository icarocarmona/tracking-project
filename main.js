const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const data = require('./data')
const templateGenerator = require('./template')
const path = require('path');

const iconPath = path.resolve(__dirname, 'icon.png');

var appIcon = null
app.on('ready', () => {
    console.log('Aplicação Iniciando');
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400,

        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)

    console.log(iconPath);

    //tray = new Tray(__dirname + '/app/img/icon.png');
    appIcon = new Tray(iconPath)
    //let template = templateGenerator.geraTrayTemplate(mainWindow);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Quit",
            click() {
                tray.destroy();
                app.quit();
            },
        }
    ]);

    appIcon = new Tray(iconPath);
    appIcon.setToolTip('Timesheet');
    appIcon.setContextMenu(contextMenu);

})

// app.disableHardwareAcceleration()

//close app in system
app.on('window-all-closed', () => {
    app.quit()
})

//this const is used to maintain only one window about 
let aboutWindow = null;
ipcMain.on('open-window-about', () => {
    if (aboutWindow == null) {
        let aboutWindow = new BrowserWindow({
            width: 300,
            height: 200,
            alwaysOnTop: true,
            //frame: false,
            webPreferences: {
                nodeIntegration: true
            }
        })
        aboutWindow.setMenuBarVisibility(false)
        //listen closed and assign null in sobreWindow
        aboutWindow.on('closed', () => {
            aboutWindow = null;
        })

        aboutWindow.loadURL(`file://${__dirname}/app/about.html`)
    }

})

ipcMain.on('close-about', () => {
    if (aboutWindow) {
        aboutWindow.close()
    }
})

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`)
    data.salvaDados(curso, tempoEstudado)
})

