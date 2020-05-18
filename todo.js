//connect to our backend
const url = "http://localhost:3000/todos";

//fetch all todos from backend

const fetchAllTodos =() =>{
  fetch(url)
  .then((res) =>res.json())
  .then((data) =>{
  data.forEach((todo) => {
      addTodoElement(todo);
  });
  })
  .catch((error) =>{
console.log(error);
  });
};
//create todo
const createTodo = (todo) => {
    const todoData = JSON.stringify(todo);
    fetch(url, {
        method: "POST",
        body: todoData,
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        addTodoElement(data);
    })
    .catch((error) => {
    console.log(error);
    });
};

//Edit todo
const completeTodo = (id) => {
  const dataToEdit = JSON.stringify({isCompleted: true});
  fetch(`${url}/${id}`, {
      method: "PATCH",
     body: dataToEdit,
      headers:{
       Accept: "application/json",
       "Content-Type": "application/json",
      },
  })
  .then((res) => res.json())
  .then((data) => {
    listItemElement.style.textDecoration = "line-through";
    console.log(data);
  })
  .catch((error) => {
  console.log(error);
  });
};

//Delete a todo
const deleteTodo = (id) => {
  fetch(`${url}/${id}`, 
      {method: "DELETE",}
  )
  .then((res) => res.json())
  .then((data) => {
      Console.log (data);
  })
  .catch((error) => {
  console.log (error);
  });
};


fetchAllTodos();


const inputElement = document.getElementById("inputText");
const addBtn = document.getElementById ("saveBtn");
const toDoListElement = document.getElementById ("list");

const addTodoElement = (todo) => {

const { isCompleted, text, _id} = todo;
    const listItemElement = document.createElement("li");
    isCompleted ? (listItemElement.style.textDecoration = "line-through") : null;
    listItemElement.innerHTML = text;
    listItemElement.classList.add(["list-group-item"]);
    
  //When a user clicks: the "✕" btn the list item is deleted & the "✓" btn the list item is displayed with a  ̶S̶t̶r̶i̶k̶e̶-̶t̶h̶r̶o̶u̶g̶h̶ 
  const eraseBtn = document.createElement ("button");
  eraseBtn.classList.add("btn","btn-danger","btn-sm","float-right","ml-1")
  eraseBtn.innerHTML = "✕";
  eraseBtn.addEventListener ("click", (e) => { 
  e.preventDefault();
  const confirmDelete = confirm("Are you sure you want to delete ths todo?");
  if(confirmDelete){
  deleteTodo(_id);
  listItemElement.remove();
  }
  });

  const finishBtn = document.createElement ("button")
  finishBtn.classList.add("btn","btn-success","btn-sm","float-right")
  finishBtn.innerHTML = "✓"
  finishBtn.addEventListener ("click", (e) => { 
  e.preventDefault();
  completeTodo(_id) 
  listItemElement.style.textDecoration = "line-through";
  });

listItemElement.appendChild(eraseBtn)
listItemElement.appendChild(finishBtn)
toDoListElement.appendChild(listItemElement);
inputElement.value = "";
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputElementValue = inputElement.value;
  if(inputElementValue=== "") {
    alert("please enter a todo");
  } else {
  const todo = {text: inputElementValue};
  createTodo (todo); 
    //addTodoElement(todo);     
      };
});
