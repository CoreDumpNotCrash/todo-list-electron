const { ipcRenderer } = require("electron");

const form = document.querySelector("form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

function renderTodos(todos) {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    const del = document.createElement("button");
    del.textContent = "❌";
    del.style.marginLeft = "1rem";

    del.onclick = () => {
      ipcRenderer.send("delete-todo", todo.id);
    };

    li.appendChild(del);
    list.appendChild(li);
  });
}

ipcRenderer.on("todos", (event, todos) => {
  renderTodos(todos);
});

ipcRenderer.on("db-error", (event, msg) => {
  alert("Database error: " + msg);
});

window.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("get-todos");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  ipcRenderer.send("add-todo", text);
  input.value = "";
});
