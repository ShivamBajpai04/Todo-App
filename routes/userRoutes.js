import { Router } from "express";
import { signup, signin } from "../controllers/userController.js";
import {
  createTodo,
  fetchTodos,
  fetchTodoById,
  updateTodo,
  completeTodo,
} from "../controllers/todoController.js";
import userMiddleware from "../middlewares/userMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.post("/todo", userMiddleware, createTodo);
router.get("/todos", userMiddleware, fetchTodos);
router.get("/todos/:id", userMiddleware, fetchTodoById);
router.patch("/completed/:id", userMiddleware, completeTodo);
router.patch("/update/:id", userMiddleware, updateTodo);

export default router;
