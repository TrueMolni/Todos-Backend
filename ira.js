const express = require("express");
const fsPromises = require("fs").promises;
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = JSON.parse(await fsPromises.readFile("ira.json", "utf8"));
    res.json(todos);
  } catch (error) {
    console.error("Помилка при зчитуванні JSON-файлу:", error);
    res.status(500).json({ error: "Помилка при обробці даних" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Invalid data" });
    }
    const todos = JSON.parse(await fsPromises.readFile("ira.json", "utf8"));
    const newTodo = { id: Date.now(), text, completed: false };
    todos.push(newTodo);
    await fsPromises.writeFile("ira.json", JSON.stringify(todos));
    res.json(todos);
  } catch (error) {
    console.error("Помилка при роботі з файлом:", error);
    res.status(500).json({ error: "Помилка при обробці даних" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let todos = JSON.parse(await fsPromises.readFile("ira.json", "utf8"));
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await fsPromises.writeFile("ira.json", JSON.stringify(todos));
    res.json(todos);
  } catch (error) {
    console.error("Помилка при роботі з файлом:", error);
    res.status(500).json({ error: "Помилка при обробці даних" });
  }
});

router.patch("/toggleall", async (req, res) => {
  try {
    const { completed } = req.body;
    let todos = JSON.parse(await fsPromises.readFile("ira.json", "utf8"));
    todos = todos.map((todo) => ({ ...todo, completed }));
    await fsPromises.writeFile("ira.json", JSON.stringify(todos));
    res.json(todos);
  } catch (error) {
    console.error("Помилка при роботі з файлом:", error);
    res.status(500).json({ error: "Помилка при обробці даних" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let todos = JSON.parse(await fsPromises.readFile("ira.json", "utf8"));
    todos = todos.filter((todo) => todo.id !== id);
    await fsPromises.writeFile("ira.json", JSON.stringify(todos));
    res.json(todos);
  } catch (error) {
    console.error("Помилка при роботі з файлом:", error);
    res.status(500).json({ error: "Помилка при обробці даних" });
  }
});

module.exports = router;
