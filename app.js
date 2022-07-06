// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");
const showYoutube = document.querySelector(".youtube-iframe>button");

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
filterOption.addEventListener('click', filterTodo);
showYoutube.addEventListener('click', showIframe);

// Functions
function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();
    // To-do DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD TO-do TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    // Check Mark Button
    createListButton(todoDiv);
    // Clear To-do INPUT VALUE
    todoInput.value = "";
}

function trashButtonListener(event) {
    const todo = event.path[1];
    // Animation
    todo.classList.add('fall');
    removeLocalTodos(todo.children[0].innerText);
    todo.addEventListener('transitionend', function () {
        todo.remove();
    });
}

function completeButtonListener(event) {
    const todo = event.path[1];
    todo.classList.toggle('completed');
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        const childStyle = todo.style;
        if (childStyle != undefined || childStyle != null) {
            switch (event.target.value) {
                case "all":
                    todo.style.display = 'flex';
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
            }
        }
    });
}

function saveLocalTodos(todo) {
    // CHECK value
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    // CHECK value
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // To-do DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        // Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Check Mark Button
        createListButton(todoDiv);
    });
}

function removeLocalTodos(todo) {
    // CHECK value
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createListButton(todoDiv) {
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    completeButton.addEventListener('click', completeButtonListener)
    todoDiv.appendChild(completeButton);
    // Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    trashButton.addEventListener('click', trashButtonListener);
    todoDiv.appendChild(trashButton);
    // Append To List
    todoList.appendChild(todoDiv);
}

function showIframe(event) {
    const iframe = document.querySelector('.youtube-iframe>iframe');
    const buttonName = event.target.innerText;

    if(buttonName === "해당 html 강의 보기") {
        iframe.classList.remove('hidden');
        event.target.innerText = "접기";
    } else {
        iframe.classList.add('hidden');
        event.target.innerText = "해당 html 강의 보기";
        iframe.src = iframe.src;
    }

}