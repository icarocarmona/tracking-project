const { ipcRenderer } = require('electron')
const timer = require('./timer')
const data = require('../../data')

let linkSobre = document.querySelector('.info-button');
let botaoPlay = document.querySelector('.botao-play')
let tempo = document.querySelector('.tempo')
let curso = document.querySelector('.curso')



let imgs = ['img/play-button.svg', 'img/stop-button.svg']
let play = false


window.onload = () => {
    console.log("testes");

    data.loadData(curso.textContent)
        .then((dados) => {
            tempo.textContent = dados.tempo;
        })
}

botaoPlay.addEventListener('click', function () {
    if (play) {
        timer.parar(curso.textContent)
        play = false
    } else {
        timer.iniciar(tempo)
        play = true
    }
    imgs = imgs.reverse()
    botaoPlay.src = imgs[0]
})

linkSobre.addEventListener('click', function () {
    ipcRenderer.send('abrir-janela-sobre')
})
