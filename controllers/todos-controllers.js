const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers/HttpError");

const { Todo } = require("../models/todos");

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({}, "-createdAt -updatedAt");
  res.json(todos);
};

const addMyTodo = async (req, res) => {
  const todos = await Todo.create(req.body);
  res.status(201).json(todos);
};

const updateCompleted = async (req, res) => {
  const { id } = req.params;
  const todos = await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!todos) {
    throw HttpError(404, `todo with ${id} not found`);
  }
  res.json(todos);
};

const updateAll = async (req, res) => {
  try {
    const { completed } = req.body;

    // Перевірка наявності значення `completed` в тілі запиту
    if (completed === undefined) {
      return res.status(400).json({ error: "Поле `completed` є обов'язковим" });
    }

    // Оновлення всіх документів
    const result = await Todo.updateMany({}, { completed });

    // Перевірка, чи були оновлені документи
    if (result.nModified === 0) {
      throw new HttpError(404, "Немає жодного todo, який було б оновлено");
    }

    // Отримання оновленого списку всіх todo
    const updatedTodos = await Todo.find({}, "-createdAt -updatedAt");
    res.json(updatedTodos);
  } catch (error) {
    // Обробка помилок
    console.error(error);
    res.status(500).json({ error: "Помилка при оновленні об'єктів" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  const result = await Todo.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `contact with ${id} not found`);
  }

  res.json({
    message: "Todo deleted",
  });
};

module.exports = {
  getAllTodos: ctrlWrapper(getAllTodos),
  addMyTodo: ctrlWrapper(addMyTodo),
  deleteTodo: ctrlWrapper(deleteTodo),
  updateAll: ctrlWrapper(updateAll),
  updateCompleted: ctrlWrapper(updateCompleted),
};
