const Project = (id,name) => {
  const todos = [];
  const getId = () => id;
  const getName = () => name;
  const getTodos = () => todos;
  const addTodo = (todo) => {
    todos.push(todo);
  }
  const deleteTodo = (index) => {
    todos.splice(index, 1);
    for(let i = 0; i < todos.length;i++) {
      todos[i].setId(i);
    }
  }
  return { getId, getName, getTodos, addTodo, deleteTodo };
}

export { Project };
