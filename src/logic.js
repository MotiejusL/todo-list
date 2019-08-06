import { Project } from './project';
import { newProject, newToDo } from './index';
import { toDo } from './todo';


function inputProjectLogic(nameinput, prid, projectarray) {
  projectarray = [];
  let projectobject = Project(prid,nameinput.value);
  projectarray.push(projectobject.getName());
  localStorage.setItem("project-" + prid, JSON.stringify(projectarray));
  newProject(projectobject, projectarray);
}

function createTodo(id, inputtitle, inputdescription, inputdueDate, selectpriority, projectobject, todosstyle, listwrapper, projectarray) {
  let todo = toDo(id, inputtitle.value, inputdescription.value, inputdueDate.value, selectpriority.value);
  projectarray.push(inputtitle.value);
  projectarray.push(inputdescription.value);
  projectarray.push(inputdueDate.value);
  projectarray.push(selectpriority.value);
  localStorage.removeItem("project-" + projectobject.getId());
  localStorage.setItem("project-" + projectobject.getId(), JSON.stringify(projectarray));
  projectobject.addTodo(todo);
  newToDo(todo, todosstyle, listwrapper, projectobject, projectarray);
}

export { inputProjectLogic, createTodo };
