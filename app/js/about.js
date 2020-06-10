// const ipc = require('electron').ipcRenderer
const { shell } = require('electron')
const process = require('process')

// let linkClose = document.querySelector("#link-close")
let linkTwitter = document.querySelector("#link-twitter")
let versaoElectron = document.querySelector("#version-electron")
// linkClose.addEventListener('click', function () {
//     ipc.send('close-about')
// })

linkTwitter.addEventListener('click', function () {
    shell.openExternal('https://twitter.com/icaro_carmona')
})

window.onload = function () {
    versaoElectron.textContent = process.versions.electron
}