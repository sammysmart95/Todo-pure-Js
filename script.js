const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

// This is the array of to-do
let inputList = [];
let newTodoId = 0;

// This is the parent function that calls other functions
const newTodo = () => {
  let input = document.getElementById("input");
  if (input.value === "") {
    alert("Add new Todo...");
    return;
  } else {
    inputList.push({
      id: newTodoId++,
      text: input.value,
      isChecked: false,
    });
    showTodo();
    input.value = "";
  }
  itemCount();
  checkboxCount();
  deleteTodo();
};

// This is the Todo DOM handler
const showTodo = () => {
  const liItem = inputList.map((todo) => {
    if (!todo.isChecked) {
      return `<li id=${todo.id} name=${todo.text} >
    <input type='checkbox' class="todo-checkbox" id="todo-checkbox">  <button id="todo-delete">Delete</button> ${todo.text} </input></li>`;
    } else {
      return `<li id=${todo.id} name=${todo.text} >
    <input type='checkbox' class="todo-checkbox" id="todo-checkbox" checked> <button id="todo-delete">Delete</button> ${todo.text} </input></li>`;
    }
  });
  list.innerHTML = liItem.join("");
};

// The Item count handler
const itemCount = () => {
  itemCountSpan.innerHTML = inputList.length;
  uncheckedCount();
};

// The checkbox handler
const checkboxCount = () => {
  checkboxes = document.querySelectorAll("#todo-checkbox");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", (e) => {
      e.preventDefault();
      checkboxes[i].isChecked = !checkboxes[i].isChecked;
      if (checkboxes[i].isChecked) {
        checkboxes[i].parentNode.className = "completed";
      }
      //If it has been unchecked.
      else {
        checkboxes[i].parentNode.className = "notcompleted";
      }
      uncheckedCount();
    });
  }
};

// The unchecked checkbox count handler
const uncheckedCount = () => {
  let itemsCount = document.querySelectorAll('input[type="checkbox"]').length;
  let checkedCount = document.querySelectorAll('input[type="checkbox"]:checked')
    .length;
  let uncheckedCount = itemsCount - checkedCount;

  uncheckedCountSpan.innerHTML = uncheckedCount;
};

// Additional, the Delete handler
// Two way delete 1. from the DOM 2. from the list array
const deleteTodo = () => {
  let deleteButton = document.querySelectorAll("#todo-delete");

  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        // this code block remove a list from the DOM
        inputList.forEach((some) => {
          if (
            deleteButton[i].parentElement.getAttribute("name") === some.text
          ) {
            deleteButton[i].parentElement.remove();
          }
        });

        // this code block gets the index of the list in the array and splice it out
        let age = inputList
          .map((e) => e.text)
          .indexOf(deleteButton[i].parentElement.getAttribute("name"));
        console.log(age);
        inputList.splice(age, 1);

        inputList = inputList;
        itemCount();
      },
      false
    );
  }
};
