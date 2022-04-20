let $ = document;
const addTodoBtn = $.getElementById("add_btn");
const todoFormModal = $.getElementById("todo_form");
const closeModal = $.querySelector(".close-modal");
const todoInput = $.getElementById("todo_input");
const todoSubmit = $.getElementById("todo_submit");
const noStatus = $.getElementById("no_status");
const statusTables = $.querySelectorAll(".status");

function openModalTodo() {
  todoFormModal.classList.add("active");
  closeModal.addEventListener("click", function () {
    todoFormModal.classList.remove("active");
  });
}

function removeTodo(event) {
  todoFormModal.classList.remove("active");
  event.target.parentElement.remove();
}

function addTodoInTable() {
  const inputValue = todoInput.value;
  if (inputValue) {
    const spanElem = $.createElement("span");
    spanElem.innerHTML = "&times;";

    const divElem = $.createElement("div");
    divElem.className = "todo";
    divElem.setAttribute("draggable", "true");
    divElem.innerHTML = inputValue;

    divElem.append(spanElem);
    noStatus.append(divElem);
    todoInput.value = "";

    spanElem.addEventListener("click", removeTodo);

    statusTables.forEach(function (statusTable) {
      statusTable.addEventListener("dragover", function (event) {
        event.preventDefault();
      });

      statusTable.addEventListener("drop", function (event) {
        event.target.append(divElem);
      });
    });
  }
}

addTodoBtn.addEventListener("click", openModalTodo);
todoSubmit.addEventListener("click", addTodoInTable);
todoInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTodoInTable();
  }
});
