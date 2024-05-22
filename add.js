class Todo {
    constructor(name, completed = false) {
      this.name = name;
      this.completed = completed;
    }
  }
  
  const nuevoTodoInput = document.getElementById('nuevo-todo');
  const agregarTodoButton = document.getElementById('but-nuevotodo');
  
  function addNewKey(key, value) {
    localStorage.setItem(key, value);
  }
  
  function getItem(key) {
    return localStorage.getItem(key);
  }
  
  function removeItem(key) {
    localStorage.removeItem(key);
  }
  
  function guardarTodoEnLocalStorage(todo) {
    let todos = obtenerTodosDelLocalStorage();
    todos.push(todo);
    addNewKey('todos', JSON.stringify(todos.map(t => ({ name: t.name, completed: t.completed }))));
  }
  
  function obtenerTodosDelLocalStorage() {
    const todosString = getItem('todos');
    return todosString ? JSON.parse(todosString).map(todo => new Todo(todo.name, todo.completed)) : [];
  }
  
  agregarTodoButton.addEventListener('click', function() {
    const nuevoTodo = nuevoTodoInput.value;
    if (nuevoTodo) {
      guardarTodoEnLocalStorage(new Todo(nuevoTodo));
      alert('TODO guardado correctamente');
      nuevoTodoInput.value = '';
    } else {
      alert('Por favor, ingrese un nombre de tarea');
    }
  });
  