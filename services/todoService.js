import Todo from "../models/todoModel.js";
import User from "../models/userModel.js";
import { createTodo } from "../validators/types.js";

export const addTodo = async ({ username, title, description }) => {
  const result = createTodo.safeParse({ title, description });
  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const addedTodo = new Todo({ title, description });
  await addedTodo.save();

  await User.updateOne({ username }, { $push: { todos: addedTodo._id } });
  return addedTodo;
};

export const getTodos = async (username) => {
  const user = await User.findOne({ username }).populate("todos");
  if (!user) throw new Error("User not found");

  return user.todos;
};

export const getTodoById = async (username, todoId) => {
  const user = await User.findOne({ username });
  if (!user || !user.todos.includes(todoId)) {
    throw new Error("Unauthorized");
  }

  const todo = await Todo.findById(todoId);
  if (!todo) throw new Error("Todo not found");
  return todo;
};

export const updateTodoById = async (username, todoId, data) => {
  const user = await User.findOne({ username });
  if (!user || !user.todos.includes(todoId)) {
    throw new Error("Unauthorized");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(todoId, data, {
    new: true,
    runValidators: true,
  });
  if (!updatedTodo) throw new Error("Todo not found");
  return updatedTodo;
};

export const markTodoAsCompleted = async (todoId) => {
  const result = await Todo.updateOne(
    { _id: todoId },
    { $set: { completed: true } }
  );
  if (result.modifiedCount === 0)
    throw new Error("Todo not found or already completed");
};
