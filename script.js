class Todo {
    constructor(name, completed = false) {
      this.name = name;
      this.completed = completed;
    }
  
    toggleCompleted() {
      this.completed = !this.completed;
    }
  }
  
  function addNewKey(key, value) {
    localStorage.setItem(key, value);
  }
  
  function getItem(key) {
    return localStorage.getItem(key);
  }
  
  function removeItem(key) {
    localStorage.removeItem(key);
  }
  
  let todosList = (getItem('todos')) ? JSON.parse(getItem('todos')).map(todo => new Todo(todo.name, todo.completed)) : [];
  
  function renderTodos() {
    const taskList = document.getElementById('task-list');
    const taskStatus = document.getElementById('task-status');
  
    taskList.innerHTML = '';
    let completedCount = 0;
  
    todosList.forEach((todo, index) => {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
      taskElement.innerHTML = `
        <span>${todo.name}</span>
        <button id="task-button-${index}" class="${todo.completed ? 'completed' : ''}" onclick="toggleTodo(${index})">
          ${todo.completed ? 'Completada' : 'Pendiente'}
        </button>
      `;
      taskList.appendChild(taskElement);
  
      if (todo.completed) {
        completedCount++;
      }
    });
  
    const totalTasks = todosList.length;
    taskStatus.textContent = `Tareas por hacer: ${totalTasks - completedCount}, Tareas Completadas: ${completedCount}`;
  }
  
  window.toggleTodo = function(index) {
    todosList[index].toggleCompleted();
    addNewKey('todos', JSON.stringify(todosList));
    renderTodos();
  };
  
  renderTodos();
  