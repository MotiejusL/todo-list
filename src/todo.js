const toDo = (id, title, description, dueDate, priority) => {
  const getId = () => id;
  const setId = (newid) => {
    id = newid
  }
  const getTitle = () => title;
  const setTitle = (newtitle) => {
    title = newtitle;
  }
  const setDescription = (newDescription) => {
    description =  newDescription;
  }
  const getDescription = () => description;
  const getdueDate = () => dueDate;
  const getpriority = () => priority;

  return { getId, getTitle, getDescription, getdueDate, getpriority, setId, setTitle, setDescription };
}

export { toDo };
