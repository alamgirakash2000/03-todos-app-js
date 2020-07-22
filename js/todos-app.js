
'use strict'

let todos=getSavedTodos()
if(!todos){
    todos=[{
        id: uuidv4(),
        text: 'Watching Movie',
        completed: false
    }]
}
let filters={
    searchText :'',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search-todos').addEventListener('input', function (e) {
    filters.searchText = e.target.value.toLowerCase()
    renderTodos(todos, filters)
})

document.getElementById('add-todos-form').addEventListener('submit', (e) => {
    e.preventDefault()
    if(e.target.elements.newTodo.value.trim()!==''){
     todos.push({
         id: uuidv4(),
         text: e.target.elements.newTodo.value.trim(),
         completed: false
     })
     saveTodos(todos)
     renderTodos(todos, filters)
     e.target.elements.newTodo.value = ''
    } 
})

document.querySelector('#hideCheckbox').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})