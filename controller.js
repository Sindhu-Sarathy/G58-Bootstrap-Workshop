import TodoItem from "./TodoItem.js";


const todoForm = document.getElementById("todoForm");

  const fileAttachmentsInput = document.getElementById("fileAttachments");
 
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const formData=new FormData(event.target);

  let todoItem = new TodoItem(
    formData.get("title"),
    formData.get("description"),
    new Date(formData.get("dueDate")),
    formData.get("assignPerson"),
    formData.getAll("attachements")
  );

  addTodoItemToUI(todoItem);
  todoForm.reset();
  console.log("Todo Item added:", todoItem);
});

fileAttachmentsInput.addEventListener("change", function(event) {
    const files = event.target.files;
    const filesList=document.getElementById("fileList");
   
    for(let i=0; i<files.length; i++){
      const listItem=document.createElement("li");
      listItem.textContent=files[i].name;
      listItem.classList.add("list-group-item","border-0","bi","bi-paperclip");
      filesList.appendChild(listItem);
    }
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
      if (todoItem.attachments.length === 0 || todoItem.attachments.length === 1 && todoItem.attachments[0].size === 0) {  
    todoItemTemplate.querySelector(".spanAttachment").style.display = "none";
  } else {
    todoItemTemplate.querySelector(".todoAttachement").textContent = todoItem.attachments.length + " attachment" + (todoItem.attachments.length > 1 ? "s" : "");
  }

   
//Deleting the todo item from the list when delete button is clicked
  const todoElement = todoItemTemplate.querySelector(".todoItemList");

  todoItemTemplate.querySelector(".btnDelete").addEventListener("click", () => {
    todoElement.remove();
  });

    document.getElementById("todoList").appendChild(todoItemTemplate);
}
