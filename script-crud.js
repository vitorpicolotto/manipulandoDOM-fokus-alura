// encontrar o botão de adicionar tarefa

const btnAdcionarTarefa = document.querySelector('.app__button--add-task')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')
const formAdcionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] 
//ao carregar a página, vai pegar na localStorage a lista de tarefas e, o resultado disso, vai ser passado para o JSON.parse (porque o localStorage só lida com strings). parse é o contrário do stringify: pega a string e se ela for um JSON formatado, vai conseguir transformar isso. Se houver algum problema, vai retornar erro no sonsole.
//se for a primeira vez que a página foi carregada, não tem nada no localStorage. Então usamos a programação devensiva []. Se o localStorage retorna nulo, o nulo não quebra o JSON.parse, mas não teremos um array para fazer o push(). Se o retorno for algo que não é um array, ou seja, um undefined ou um null, adicionamos um "ou" || e colocamos um array vazio. Se o resultado for passado pelo JSON.parse(), ótimo, mas se não der certo, vai cair no "ou" e é colocado um array vazio. Então não precisamos nos preocupar se tem ou não tem tarefas.
let tarefaSelecionada = null
let liTarefaSelecionada = null

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

//criar uma função para que receba uma tarefa e saiba devolver um HTML (que representa essa tarefa)
function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"         fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        //debugger
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        //console.log('Nova descrição da tarefa: ', novaDescricao)
        if (novaDescricao){
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        }
        
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')

    botao.append(imagemBotao)
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    if (tarefa.completa){
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    }  else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(elemento => {
            elemento.classList.remove('app__section-task-list-item-active')
        })
        if(tarefaSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null
            liTarefaSelecionada = null
            return //é um early return, usado para que essa parte do código não fique sendo repetida várias vezes, só no momento do clique
        }
        tarefaSelecionada = tarefa
        liTarefaSelecionada = li
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
       
        li.classList.add('app__section-task-list-item-active')
        }

    }

    return li
}

btnAdcionarTarefa.addEventListener('click', () => {
    formAdcionarTarefa.classList.toggle('hidden')
} )
//utilizando o .toggle, fazemos a alternância da classe 'hidden', que esconde o formulário. Então todas as vezes que clicar no botão de adicionar tarefa, vai exibir o formulário que estava "escondido".

formAdcionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas()
    textArea.value = ''
    formAdcionarTarefa.classList.add('hidden')
})
//ao submetermos o formulário ('submit'), a página automaticamente recarrega e o formulário não é submetido. Por conta disso, colocamos o parâmetro 'evento' na função, para que possamos usar o método .preventDefault() e o comportamento padrão de recarregar a página/aplicação não seja realizado. Agora é necessário pegar o valor do textArea (textArea.value) e guardar em um objeto. 
//Nesse caso, queremos colocar um item dentro do localStorage, por isso, vamos usar o método setItem(). Que item é esse? Como primeiro parâmetro, vamos passar tarefas entre aspas, porque queremos guardar a lista inteira de tarefas lá dentro. Em outras palavras, passamos uma string tarefas, que é a chave de acesso para esse valor. O segundo parâmetro que devemos passar é o valor em si, que é a lista de tarefas. Por isso, vamos passar a variável tarefas.

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});

//Cancelar a tarefa

const limparFormulario = () => {
    textArea.value = ""
    formAdcionarTarefa.classList.add('hidden');
}

btnCancelar.addEventListener('click', limparFormulario)

document.addEventListener('FocoFinalizado', () =>{
    if (tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        tarefaSelecionada.completa = true
        atualizarTarefas()
    }
})

const removerTarefas = (somenteCompletas) => {
    let seletor = ".app__section-task-list-item"
    if (somenteCompletas) {
        seletor = ".app__section-task-list-item-complete"
    }
    //const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item" //booleanos ternários: se é somente a primeira classe (completas) = true, se não usa a segunda classe!
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : [] //filtrar tarefas não completas, pois queremos remover apenas as completas
    atualizarTarefas()
}

btnRemoverConcluidas.onclick = () => removerTarefas(true)
btnRemoverTodas.onclick = () => removerTarefas(false)
