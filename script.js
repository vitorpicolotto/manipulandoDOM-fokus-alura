const html = document.querySelector('html') //pegando a tag html
const focoBt = document.querySelector('.app__card-button--foco') //pegando a classe do botão de foco
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})
//'change' por se tratar de um checkbox. pela música ter apenas 6 minutos, criamos um loop para ela ficar repetindo até durarem os cronômetros.

focoBt.addEventListener('click', () => {
   alterarContexto('foco')
   focoBt.classList.add('active')
})

//adicionando o evento de clicar. Foi criada uma arrow function para dizer o que quero que aconteça ao haver o click. o setAttibute serve justamente para definir o que eu quero que aconteça, que no caso é pegar o atributo 'data-contexto' e aplicar o estilo do 'foco'. Isso altera a cor de fundo da página.
//o mesmo está sendo feito para alterar as imagens, mas dessa vez pegando o atributo src e passando o caminho da imagem que quero usar no evento do click.
//utilizamos o método classList.add para selecionar uma classe e adicionar a classe active quando houver o evento de click

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto (contexto) {
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?  <strong class="app__title-strong"> Faça uma pausa curta! </strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.
            <strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `

        default:
            break;
    }
}
//função criada para refatorar o código, deixando-o mais clean.