import TodoItem from "./TodoItem.js";

const todoForm = document.getElementById("todoForm");

todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const formData=new FormData(event.target);
  const fileDataInput= document.getElementById("fileAttachments");
  const fileList = Array.from(fileDataInput.files);
  
  let todoItem = new TodoItem(
    formData.get("title"),
    formData.get("description"),
    new Date(formData.get("dueDate")),
    formData.get("assignPerson"),
    fileList
  );

  addTodoItemToUI(todoItem);
  todoForm.reset();
  console.log("Todo Item added:", todoItem);
});




function addTodoItemToUI(todoItem){
    const todoItemTemplate = document.getElementById("templateTodo").content.cloneNode(true);

    todoItemTemplate.querySelector(".todoTitle").textContent = todoItem.title;
    todoItemTemplate.querySelector(".todoDescription").textContent = todoItem.description;
    todoItemTemplate.querySelector(".todoCreatedDate").textContent = todoItem.createdDate.toISOString().split('T')[0];
    todoItemTemplate.querySelector(".todoDueDate").textContent = todoItem.dueDate.toISOString().split('T')[0];
    if(todoItem.assignee !=="0"){
        todoItemTemplate.querySelector(".todoAssignedPerson").textContent = todoItem.assignee;
    }
    else{
        todoItemTemplate.querySelector(".spanAssignedPerson").style.display = "none";
    }
    
    const attachmentsCount = todoItem.attachments.length;
    if(attachmentsCount > 0){
    todoItemTemplate.querySelector(".todoAttachement").textContent = `${attachmentsCount} attachment${attachmentsCount === 1 ? "" : "s"}`;
    }
    else{
        todoItemTemplate.querySelector(".spanAttachment").style.display = "none";
        
    }
   
//Deleting the todo item from the list when delete button is clicked
  const todoElement = todoItemTemplate.querySelector(".todoItemList");

  todoItemTemplate.querySelector(".btnDelete").addEventListener("click", () => {
    todoElement.remove();
  });

    document.getElementById("todoList").appendChild(todoItemTemplate);
}
