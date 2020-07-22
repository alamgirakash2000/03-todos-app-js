'use strict'

const todosEl= document.querySelector('#todos')

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try{
        return JSON.parse(todosJSON)
    }catch(e) {
        return []
    }
}

// Save todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove todo by id
const removeTodo = function (id) {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo
const toggleTodo = function (id) {
    const todo = todos.find((todo) => todo.id === id)

    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
}

function getFilteredTodos(todos,filters){
    var newArr= new Array()
    for(var todo of todos){
        if(todo.text.toLowerCase().includes(filters.searchText)){
            newArr.push(todo)
        }
    }
    return newArr
}

function getIncompleteTodos(todos){
    var newArr= new Array()
    for(var todo of todos){
        if(!todo.completed){
            newArr.push(todo)
        }
    }
    return newArr
}


// Get the DOM elements for an individual note
function generateDOM(todo){
    const containerEL=document.createElement('div')
    const todoEl = document.createElement('label')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change', function () {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    containerEL.classList.add('todo-container')
    // Setup the todo text
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    // Setup the remove button
    removeButton.textContent = 'Remove'
    
    removeButton.addEventListener('click', function () {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
   containerEL.appendChild(todoEl)
   containerEL.appendChild(removeButton)
   todosEl.appendChild(containerEL)
}

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
    document.querySelector('#left-todos').innerHTML=''
    const summary = document.createElement('h2')
    try{
        summary.textContent = `You have ${incompleteTodos.length} todo left`
    }catch{
        summary.textContent = `You have 0 todos left`
    }
    document.querySelector('#left-todos').appendChild(summary)
}


// Render application todos based on filters
function renderTodos(todos, filters){
    const filteredTodos= getFilteredTodos(todos,filters)
    const incompleteTodos= getIncompleteTodos(filteredTodos)

    generateSummaryDOM(incompleteTodos)
    todosEl.innerHTML=''
    if(filters.hideCompleted){
        if(incompleteTodos.length){
            incompleteTodos.forEach((todo) => generateDOM(todo))
        }else{
            const leftTodos = document.createElement('p')
            leftTodos.textContent='You have no todos to show'
            document.querySelector('#todos').appendChild(leftTodos)
            }
    }else if(filteredTodos.length){  
        filteredTodos.forEach((todo) => generateDOM(todo))

    }else{
        const leftTodos = document.createElement('p')
        leftTodos.textContent='You have no todos to show'
        document.querySelector('#todos').appendChild(leftTodos)
        }
}