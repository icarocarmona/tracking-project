const ipc = require('electron').ipcRenderer
const { shell , remote } = require('electron')
const process = require('process')

let linkClose = document.querySelector("#link-fechar")
let linkTwitter = document.querySelector("#link-twitter")
let versaoElectron = document.querySelector("#version-electron")

linkClose.addEventListener('click', function () {
    console.log('close');
    var screenerWindow = remote.getCurrentWindow()
    screenerWindow.close()
  
    // ipc.send('fechar-janela-sobre')
})

linkTwitter.addEventListener('click', function () {
    shell.openExternal('https://twitter.com/icaro_carmona')
})

window.onload = function () {
    versaoElectron.textContent = process.versions.electron
}