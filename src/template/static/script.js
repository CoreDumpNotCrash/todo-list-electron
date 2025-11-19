let todos = [];

const form = document.querySelector("form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo;

    const del = document.createElement("button");
    del.textContent = "X";
    del.style.marginLeft = "1em";

    del.onclick = () => {
      deleteTodo(index);
    };
    li.appendChild(del);
    list.appendChild(li);
  });
}

function addTodo(text) {
  todos.push(text);
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text);
  input.value = "";
});

renderTodos();
