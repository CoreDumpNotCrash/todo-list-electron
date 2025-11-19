import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { initDB, getTodos, deleteTodo, addTodo } from "./modules/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  });
  win.loadFile(path.join(__dirname, "template", "index.html"));
}

app.whenReady().then(() => {
  initDB();
  createWindow();
});

ipcMain.on("get-todos", (event) => {
  getTodos((err, rows) => {
    if (err) {
      console.error(err);
      event.reply("db-error", err.message);
      return;
    }
    event.reply("todos", rows);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("add-todo", (event, text) => {
  addTodo(text, (err) => {
    if (err) {
      console.error(err);
      event.reply("db-error", err.message);
      return;
    }

    getTodos((err2, rows) => {
      if (err2) {
        console.error(err2);
        event.reply("db-error", err2.message);
        return;
      }
      event.reply("todos", rows);
    });
  });
});

ipcMain.on("delete-todo", (event, id) => {
  deleteTodo(id, (err) => {
    if (err) {
      console.error(err);
      event.reply("db-error", err.message);
      return;
    }

    getTodos((err2, rows) => {
      if (err2) {
        console.error(err2);
        event.reply("db-error", err2.message);
        return;
      }
      event.reply("todos", rows);
    });
  });
});
