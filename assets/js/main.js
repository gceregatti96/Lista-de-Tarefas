//1 passo, selecionar as tarefas
const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')


function criaLi() {
    const li = document.createElement('li')
    return li
}

inputTarefa.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if (!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
    }
})

function limpaInput() {
    inputTarefa.value = ''
    inputTarefa.focus()
}

function criaBotaoApagar (li) {
    li.innerText += ' '
    const botaoApagar = document.createElement ('button')
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar)
}

function criaTarefa(textoInput) {
    const li = criaLi()
    li.innerText = textoInput
    tarefas.appendChild(li)
    //agora adicionar o li na lista de tarefas do html
    tarefas.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefa()
}

//capturar o clique do botão
btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return //não adicionar se nao houver texto
    criaTarefa(inputTarefa.value) //criando tarefa para pegar o texto
})

//vendo onde esta sendo clicado o mouse
document.addEventListener('click', function(e) {
    const el = e.target
    if (el.classList.contains('apagar')) {
        el.parentElement.remove()
        salvarTarefa()
    }
})

function salvarTarefa() {
    const liTarefas = tarefas.querySelectorAll('li')
    const listadeTarefas = []
    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listadeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listadeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas')
    const listadeTarefas = JSON.parse(tarefas)
    
    for(let tarefa of listadeTarefas) {
        criaTarefa(tarefa)
    }
}
adicionaTarefasSalvas()
