const html = document.querySelector('html') //pegando a tag html
const focoBt = document.querySelector('.app__card-button--foco') //pegando a classe do botão de foco
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')

focoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco')
})

//adicionando o evento de clicar. Foi criada uma arrow function para dizer o que quero que aconteça ao haver o click. o setAttibute serve justamente para definir o que eu quero que aconteça, que no caso é pegar o atributo 'data-contexto' e aplicar o estilo do 'foco'. Isso altera a cor de fundo da página.

curtoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto')
})

longoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo')
})
