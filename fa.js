const todos = [];
let newTodoId = 0;
let checkboxes;
let checkboxArray;

const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
};

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

function newTodo() {
  let getTodo = prompt("Add new to-do", "");

  if (getTodo == null || getTodo == "") {
    console.log("you don't add new to-do");
  } else {
    todos.push({
      id: newTodoId++,
      text: getTodo,
      isChecked: false,
    });
    drawTodoList();
  }
}

function drawTodoList() {
  const liItem = todos.map((todo) => {
    if (!todo.isChecked) {
      return `<li id=${todo.id} class=${classNames.TODO_ITEM}>
    <input type='checkbox' class=${classNames.TODO_CHECKBOX}>${todo.text}</li>`;
    } else {
      return `<li id=${todo.id} class=${classNames.TODO_ITEM}>
    <input type='checkbox' class=${classNames.TODO_CHECKBOX} checked>${todo.text}</li>`;
    }
  });
  list.innerHTML = liItem.join("");

  checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxArray = Array.from(checkboxes);
  checkboxArray.forEach(function (checkbox) {
    checkbox.addEventListener("change", confirmCheck);
  });
  countItem();
}

function confirmCheck() {
  let checkedToDo = todos.find((todo) => {
    return todo.id == this.parentElement.id;
  });
  checkedToDo.isChecked = !checkedToDo.isChecked;
  countItem();
}

function countItem() {
  let itemCount = document.querySelectorAll('input[type="checkbox"]').length;
  let checkedCount = document.querySelectorAll('input[type="checkbox"]:checked')
    .length;
  let uncheckedCount = itemCount - checkedCount;
  itemCountSpan.innerHTML = itemCount;
  uncheckedCountSpan.innerHTML = uncheckedCount;
}
