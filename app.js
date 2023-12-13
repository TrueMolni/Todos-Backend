const express = require("express");
const fsPromises = require("fs").promises; // Використовуйте з fs.promises для асинхронних операцій
const cors = require("cors");
const app = express();
require("dotenv").config();
const { PORT } = process.env;
const user = require("./ira");

app.use(cors());
app.use(express.json());

app.get("/api/todos", async (req, res) => {
  try {
    const todos = JSON.parse(await fsPromises.readFile("todos.json", "utf8"));
    res.json(todos);
  } catch (error) {
    console.error("Помилка при зчитуванні JSON-файлу:", error);
    res.status(500).json({ error: "Помилка при обробці даних" });
  }
});

app.post("/api/todos", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Invalid data" });
    }
    const todos = JSON.parse(await fsPromises.readFile("todos.json", "utf8"));
    const newTodo = { id: Date.now(), text, completed: false };
    todos.push(newTodo);
    await fsPromises.writeFile("todos.json", JSON.stringify(todos));
    res.json(todos);
  } catch (error) {
    console.error("Помилка при роботі з файлом:", error);
    res.status(500).json({ error: "Помилка при обробці даних" });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let todos = JSON.parse(await fsPromises.readFile("todos.json", "utf8"));
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await fsPromises.writeFile("todos.json", JSON.stringify(todos));
    res.json(todos);
  } catch (error) {
    console.error("Помилка при роботі з файлом:", error);
    res.status(500).json({ error: "Помилка при обробці даних" });
  }
});

app.patch("/api/todos/toggleall", async (req, res) => {
  try {
    const { completed } = req.body;
    let todos = JSON.parse(await fsPromises.readFile("todos.json", "utf8"));
    todos = todos.map((todo) => ({ ...todo, completed }));
    await fsPromises.writeFile("todos.json", JSON.stringify(todos));
    res.json(todos);
  } catch (error) {
    console.error("Помилка при роботі з файлом:", error);
    res.status(500).json({ error: "Помилка при обробці даних" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let todos = JSON.parse(await fsPromises.readFile("todos.json", "utf8"));
    todos = todos.filter((todo) => todo.id !== id);
    await fsPromises.writeFile("todos.json", JSON.stringify(todos));
    res.json(todos);
  } catch (error) {
    console.error("Помилка при роботі з файлом:", error);
    res.status(500).json({ error: "Помилка при обробці даних" });
  }
});

app.use("/api/todos/ira", user);

app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});
