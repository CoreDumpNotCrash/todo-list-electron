import { app, BrowserWindow } from "electron";
import path from "path";

const __dirname = import.meta.dirname;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
  });
  mainWindow.loadFile(path.join(__dirname, "template", "index.html"));
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
