// encontrar o botão de adicionar tarefa

const btnAdcionarTarefa = document.querySelector('.app__button--add-task')
const formAdcionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const tarefas = []

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
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
})
//ao submetermos o formulário ('submit'), a página automaticamente recarrega e o formulário não é submetido. Por conta disso, colocamos o parâmetro 'evento' na função, para que possamos usar o método .preventDefault() e o comportamento padrão de recarregar a página/aplicação não seja realizado. Agora é necessário pegar o valor do textArea (textArea.value) e guardar em um objeto. 
//Nesse caso, queremos colocar um item dentro do localStorage, por isso, vamos usar o método setItem(). Que item é esse? Como primeiro parâmetro, vamos passar tarefas entre aspas, porque queremos guardar a lista inteira de tarefas lá dentro. Em outras palavras, passamos uma string tarefas, que é a chave de acesso para esse valor. O segundo parâmetro que devemos passar é o valor em si, que é a lista de tarefas. Por isso, vamos passar a variável tarefas.

