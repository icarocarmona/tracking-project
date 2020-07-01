const { ipcRenderer } = require('electron')
const timer = require('./timer')
const data = require('../../data')

let linkSobre = document.querySelector('.info-button')
let botaoPlay = document.querySelector('.botao-play')
let tempo = document.querySelector('.tempo')
let curso = document.querySelector('.curso')
let botaoAdicionar = document.querySelector('.botao-adicionar')
let campoAdicionar = document.querySelector('.campo-adicionar')



let imgs = ['img/play-button.svg', 'img/stop-button.svg']
let play = false


window.onload = () => {
    data.loadData(curso.textContent)
        .then((dados) => {
            tempo.textContent = dados.tempo;
        })
}

botaoPlay.addEventListener('click', function () {
    if (play) {
        timer.parar(curso.textContent)
        play = false
        new Notification('Time Tracking', {
            body: `O projeto ${curso.textContent} pausado!`,
            icon: 'img/stop-button.png'
        })
    } else {
        timer.iniciar(tempo)
        play = true
        new Notification('Time Tracking', {
            body: `O projeto ${curso.textContent} iniciado!`,
            icon: 'img/play-button.png'
        })
    }
    imgs = imgs.reverse()
    botaoPlay.src = imgs[0]
})

linkSobre.addEventListener('click', function () {
    ipcRenderer.send('open-about')
})

botaoAdicionar.addEventListener('click', function () {
    if (campoAdicionar.value == '') {
        return;
    }

    let novoCurso = campoAdicionar.value
    curso.textContent = novoCurso
    tempo.textContent = '00:00:00'
    campoAdicionar.value = ''
    ipcRenderer.send('curso-adicionado', novoCurso)
})

ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
    timer.parar(curso.textContent)
    data.loadData(nomeCurso)
        .then((dados) => {
            tempo.textContent = dados.tempo;
        })
        .catch((err) => {
            tempo.textContent = '00:00:00'
        })
    curso.textContent = nomeCurso;
});

ipcRenderer.on('shortcut-play-stop', () => {
    let click = new MouseEvent('click')
    botaoPlay.dispatchEvent(click)
})