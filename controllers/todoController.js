import {
  addTodo,
  getTodos,
  getTodoById,
  updateTodoById,
  markTodoAsCompleted,
} from "../services/todoService.js";

export const createTodo = async (req, res) => {
  try {
    const { username } = req;
    const { title, description } = req.body;
    const todo = await addTodo({ username, title, description });
    res.status(201).json({ msg: "Todo added successfully", todo });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const fetchTodos = async (req, res) => {
  try {
    const todos = await getTodos(req.username);
    res.status(200).json({ todos });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const fetchTodoById = async (req, res) => {
  try {
    const todo = await getTodoById(req.username, req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(403).json({ msg: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await updateTodoById(
      req.username,
      req.params.id,
      req.body
    );
    res.status(200).json({ updatedTodo });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const completeTodo = async (req, res) => {
  try {
    await markTodoAsCompleted(req.params.id);
    res.status(200).json({ msg: "Todo marked as completed" });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
