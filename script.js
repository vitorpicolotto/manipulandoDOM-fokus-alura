const html = document.querySelector('html') //pegando a tag html
const focoBt = document.querySelector('.app__card-button--foco') //pegando a classe do botão de foco
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')

focoBt.addEventListener('click', () => {
   alterarContexto('foco')
})

//adicionando o evento de clicar. Foi criada uma arrow function para dizer o que quero que aconteça ao haver o click. o setAttibute serve justamente para definir o que eu quero que aconteça, que no caso é pegar o atributo 'data-contexto' e aplicar o estilo do 'foco'. Isso altera a cor de fundo da página.
//o mesmo está sendo feito para alterar as imagens, mas dessa vez pegando o atributo src e passando o caminho da imagem que quero usar no evento do click.

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
})

function alterarContexto (contexto) {
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