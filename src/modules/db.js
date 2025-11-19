import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("todos.db");

export function initDB() {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL
    );
  `);
}

export function getTodos(callback) {
  db.all("SELECT * FROM todos", (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
}

export function addTodo(text, callback) {
  db.run("INSERT INTO todos (text) VALUES (?)", [text], (err) => {
    if (err) return callback(err);
    callback(null);
  });
}

export function deleteTodo(id, callback) {
  db.run("DELETE FROM todos WHERE id = ?", [id], (err) => {
    if (err) return callback(err);
    callback(null);
  });
}
