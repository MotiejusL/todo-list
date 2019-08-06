import { Project } from './project';
import { toDo } from './todo';
import { inputProjectLogic, createTodo } from './logic';

let newproject = document.getElementById("newProject");
let projects = document.getElementsByClassName("projects")[0];
let main =  document.getElementsByClassName("main")[0];
let side = document.getElementsByClassName("side")[0];
let wrapper = null;
let id = 0;
let todoid = 0;
let projectarray = [];
let prid = localStorage.length;


let clear = document.createElement("button");
clear.innerHTML = "Clear projects";
clear.style.cssText = "display:block;  margin:auto; margin-top: 20px; background: -webkit-linear-gradient(to right, #49a09d, #5f2c82); background: linear-gradient(to right, #49a09d, #5f2c82); width:200px; height:35px; color:white; font-size:20px; border-radius:15px; -moz-box-shadow: 0 8px 6px -6px black; -webkit-box-shadow: 0 8px 6px -6px black; box-shadow: 0 8px 6px -6px black; border:none;";
clear.addEventListener('click', function() {
  localStorage.clear();
  window.location.reload();
})
side.insertBefore(clear, side.children[1]);
console.log(localStorage.length);

//load localStorage projects
for(let i = 0; i < localStorage.length; i++) {
  todoid = 0;
  let key =  localStorage.key(i);
  console.log(key);
  let project = JSON.parse(localStorage.getItem(key));
  let newproject = Project(i, project[0]);
  for(let i = 1; i < project.length; i+=4) {
    let newtodo = toDo(todoid, project[i], project[i+1], project[i+2], project[i+3]);
    newproject.addTodo(newtodo);
    todoid += 1;
  }
  newProject(newproject, project);
  console.log(project);
}

//input for new project
newproject.addEventListener('click', function() {
  let form = document.createElement("form");
  form.style.cssText = "text-align:center; margin-top:20px; margin-bottom:15px;";
  let nameinput = document.createElement("input");
  nameinput.type = "text";
  nameinput.style.cssText = "width:180px; height:25px; border-top-left-radius:8px; border-bottom-left-radius:8px;";
  let create = document.createElement("button");
  create.type = "button";
  create.innerHTML = "Create";
  create.style.cssText = "background:none; height:25px; border-top-right-radius:8px; border-bottom-right-radius:8px; sont-size:22px; color:white;"
  form.appendChild(nameinput);
  form.appendChild(create);
  projects.insertBefore(form, projects.children[1]);
  this.disabled = true;

  //calls new project function after click
  create.addEventListener('click', function() {
    inputProjectLogic(nameinput, prid, projectarray);
    newproject.disabled = false;
    form.parentNode.removeChild(form);
    prid += 1;
})
})

//creates new project
function newProject(projectobject, projectarray) {
  id = 0;
  let addedproject = document.createElement("p");
  addedproject.innerHTML = projectobject.getName();
  addedproject.style.cssText = "text-align:center; color:white; font-size:30px;";

  //adds wrapper for todos
  addedproject.addEventListener('click', function() {
    if(wrapper != null) {
      wrapper.parentNode.removeChild(wrapper);
    }
    let listwrapper = document.createElement("div");
    listwrapper.style.cssText = "width:calc(100%-40px); margin:10px 20px; background: linear-gradient(to right, rgba(73,160,157,0.5), rgba(95,44,130,0.5)); background: -webkit-linear-gradient(to right, rgba(73,160,157,0.5), rgba(95,44,130,0.5)); border: 1px solid black; border-radius:15px; overflow:auto;";
    let addnewbutton = document.createElement("button");
    addnewbutton.style.cssText = "width:100%; height:60px; border-top-right-radius:15px; border-top-left-radius:15px; font-size: 30px; background: linear-gradient(to right, rgba(73,160,157,1), rgba(95,44,130,1)); background: -webkit-linear-gradient(to right, rgba(73,160,157,1), rgba(95,44,130,1)); color:white;";
    addnewbutton.addEventListener('mouseover', function() {
      addnewbutton.style.fontSize = "34px";
      addnewbutton.style.transition = "font-size 0.3s";
    })
    addnewbutton.addEventListener('mouseout', function() {
      addnewbutton.style.fontSize = "30px";
    })
    addnewbutton.innerHTML = "Add new Todo";
    let todosstyle = "width:20%; float:left; font-size:25px; color:white; text-align:center; margin-top:20px; margin-bottom:20px;";
    let title = document.createElement("div");
    title.style.cssText = todosstyle;
    title.innerHTML = "Title";
    let description = document.createElement("div");
    description.style.cssText = todosstyle;
    description.innerHTML = "Descrption";
    let dueDate = document.createElement("div");
    dueDate.style.cssText = todosstyle;
    dueDate.innerHTML = "dueDate";
    let priority = document.createElement("div");
    priority.style.cssText = todosstyle;
    priority.innerHTML = "Priority";
    let deletetodo = document.createElement("div");
    deletetodo.style.cssText = todosstyle;
    deletetodo.innerHTML = "Delete";

    listwrapper.appendChild(addnewbutton);
    listwrapper.appendChild(title);
    listwrapper.appendChild(description);
    listwrapper.appendChild(dueDate);
    listwrapper.appendChild(priority);
    listwrapper.appendChild(deletetodo);

    //loads todos if project has them
      projectobject.getTodos().forEach(function(element) {
        newToDo(element, todosstyle, listwrapper, projectobject, projectarray);
      })

      let first = true;
      //creates new todo
    addnewbutton.addEventListener('click', function() {
      this.disabled = true;
      let form = document.createElement("form");
      let inputtitle = document.createElement("input");
      let inputstyle = "width:calc(25% - 10px); height:35px; margin:5px;";
      inputtitle.type = "text";
      inputtitle.style.cssText = inputstyle;
      let inputdescription = document.createElement("input");
      inputdescription.type = "text";
      inputdescription.style.cssText = inputstyle;
      let inputdueDate = document.createElement("input");
      inputdueDate.type = "date";
      inputdueDate.style.cssText = inputstyle;
      let selectpriority = document.createElement("select");
      let option1 = document.createElement("option");
      option1.innerHTML = "low";
      option1.value = "low";
      let option2 = document.createElement("option");
      option2.innerHTML = "medium";
      option2.value = "medium";
      let option3 = document.createElement("option");
      option3.innerHTML = "high";
      option3.value = "high";
      selectpriority.appendChild(option1);
      selectpriority.appendChild(option2);
      selectpriority.appendChild(option3);
      selectpriority.style.cssText = inputstyle;
      let added = document.createElement("button");
      added.type = "button";
      added.innerHTML = "Confirm";
      added.style.cssText = "width:50%; display:block; margin:auto; font-size:25px; margin-top:10px; background: linear-gradient(to right, rgba(73,160,157,1), rgba(95,44,130,1)); background: -webkit-linear-gradient(to right, rgba(73,160,157,1), rgba(95,44,130,1)); color:white; border-radius:15px; height:35px;";
      added.addEventListener('click', function() {
        addnewbutton.disabled = false;
        createTodo(id, inputtitle, inputdescription, inputdueDate, selectpriority, projectobject, todosstyle, listwrapper, projectarray);
        console.log(projectarray);
        console.log(prid);
        console.log(projectobject.getId());
        id += 1;

        //adds todo to wrapper
        form.parentNode.removeChild(form);

      })
      form.appendChild(inputtitle);
      form.appendChild(inputdescription);
      form.appendChild(inputdueDate);
      form.appendChild(selectpriority);
      form.appendChild(added);
      listwrapper.insertBefore(form, listwrapper.children[1]);

    })
    wrapper = listwrapper;
    main.appendChild(listwrapper);

  })
  projects.appendChild(addedproject);


}



function newToDo(todo, todosstyle, listwrapper, projectobject, projectarray) {
  let title = document.createElement("div");
  title.style.cssText = todosstyle;
  title.innerHTML = todo.getTitle();
  title.addEventListener('dblclick', function() {
    edit(todo, title, projectobject, projectarray, 1);
  })
  let description = document.createElement("div");
  description.style.cssText = todosstyle;
  description.innerHTML = todo.getDescription();
  description.addEventListener('dblclick', function() {
    edit(todo, description, projectobject, projectarray, 2);
  })
  let dueDate = document.createElement("div");
  dueDate.style.cssText = todosstyle;
  dueDate.innerHTML = todo.getdueDate();
  let priority = document.createElement("div");
  priority.style.cssText = todosstyle;
  priority.innerHTML = todo.getpriority();
  let deletetodo = document.createElement("div");
  deletetodo.style.cssText = todosstyle;
  deletetodo.innerHTML = "Delete";

  let clearfix =  document.createElement("br");
  clearfix.style.cssText = "clear:both;";

  listwrapper.appendChild(title);
  listwrapper.appendChild(description);
  listwrapper.appendChild(dueDate);
  listwrapper.appendChild(priority);
  listwrapper.appendChild(deletetodo);
  listwrapper.appendChild(clearfix);

  deletetodo.addEventListener('click', function() {
    title.parentNode.removeChild(title);
    description.parentNode.removeChild(description);
    dueDate.parentNode.removeChild(dueDate);
    priority.parentNode.removeChild(priority);
    deletetodo.parentNode.removeChild(deletetodo);
    console.log(projectarray);
    console.log(todo.getId());
    if(todo.getId() == 0)
    projectarray.splice((todo.getId()+1), 4);
    else
    projectarray.splice(((todo.getId()*4) + todo.getId() - (todo.getId() - 1)), 4);
    localStorage.removeItem("project-" + projectobject.getId());
    localStorage.setItem("project-" + projectobject.getId(), JSON.stringify(projectarray));
    projectobject.deleteTodo(todo.getId());
    console.log(projectarray);
    id -= 1;
  })
}

function edit(todo, div, projectobject, projectarray, where) {
  let editinfo = where;
  div.innerHTML = "";
  let input = document.createElement("input");
  input.style.width = "120px";
  input.style.height = "30px";
  let submit = document.createElement("button");
  submit.innerHTML = "OK";
  submit.style.height = "30px";
  input.type = "text";
  div.appendChild(input);
  div.appendChild(submit);
  submit.addEventListener('click', function() {
    projectobject.getTodos().forEach(function(element) {
      if(todo.getId() == element.getId()) {
        if(editinfo == 1) {
          todo.setTitle(input.value);
          input.parentNode.removeChild(input);
          div.innerHTML = input.value;
          if(todo.getId() == 0)
          projectarray.splice(todo.getId()+1,1,input.value);
          else
          projectarray.splice(((todo.getId()*4) + todo.getId() - (todo.getId() - 1)), 1, input.value);
          console.log(projectarray);
          localStorage.removeItem("project-" + projectobject.getId());
          localStorage.setItem("project-" + projectobject.getId(), JSON.stringify(projectarray));
        }
        else if (editinfo == 2) {
          todo.setDescription(input.value);
          input.parentNode.removeChild(input);
          div.innerHTML = input.value;
          console.log(todo.getId());
          if(todo.getId() == 0)
          projectarray.splice(todo.getId()+2,1,input.value);
          else
          projectarray.splice(((todo.getId()*4) + todo.getId() - (todo.getId() - 2)), 1, input.value);
          console.log(projectarray);
          localStorage.removeItem("project-" + projectobject.getId());
          localStorage.setItem("project-" + projectobject.getId(), JSON.stringify(projectarray));
        }
      }
    })
  })
}

export { newProject, newToDo };
