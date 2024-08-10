import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import { User, Todo } from "../db/index.js";
import userMiddleware from "../middleware/userMiddleware.js";
import dotenv from "dotenv";
import { createTodo, userSchema } from "../types.js";
import bcrypt from "bcrypt";

dotenv.config();

router.post("/signup", async (req, res) => {
  // Implement user signup logic
  try {
    const username = req.body.username;
    const password = req.body.password;

    const valid = userSchema.safeParse({ username:username, password:password });

    if (!valid.success) {
      res.json({
        msg: "invalid username or password",
      });
      return;
    }
	
    const hash = await bcrypt.hash(password, 10);

    const response = await User.findOne({
      username,
    });
    if (!response) {
      await User.create({
        username,
        password: hash,
      });

      res.status(200).json({
        msg: "Success: User Created",
      });
    } else {
      res.status(403).json({
        msg: "User already exists",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
      username,
    });
    if (!user) {
      res.status(411).json({
        msg: "User does not exist",
      });
      return;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.sign(username, process.env.JWT_SECRET);
      res.status(200).json({
        token,
      });
    } else {
      res.status(411).json({
        msg: "invalid username or password",
      });
    }
  } catch (error) {
    res.status(411).json({
      msg: "invalid username or password",
    });
    console.log(error);
  }
});

router.post("/todo", userMiddleware, async (req, res) => {
  const username = req.username;
  const title = req.body.title;
  const description = req.body.description;
  const result = createTodo.safeParse({
    title,
    description,
  });
  if (!result.success) {
    res.status(411).json({
      msg: "Invalid inputs",
    });
    return;
  }
  //Add todo to DB
  try {
    const addedTodo = await Todo.create({
      title: title,
      description: description,
    });
    // console.log(addedTodo);
    await User.updateOne(
      {
        username,
      },
      {
        $push: { todos: addedTodo._id },
      }
    );
    res.status(200).json({
      msg: "Todo added",
      todos: addedTodo,
    });
  } catch (e) {
    res.json({
      msg: "Could not add todo",
      err: e,
    });
  }
});

router.get("/todos", userMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.username,
    });
    const todos = await Todo.find({
      _id: {
        $in: user.todos,
      },
    });
    if (todos.length) {
      res.status(200).json({ todos });
    } else {
      res.status(403).json({
        todos: [],
        msg: "No Todos Added",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//vulnerability ish

router.get("/todos/:id", userMiddleware, async (req, res) => {
  try {
    const todoId = req.params.id;

    //checking if user is authorised to access that todo
    const user = await User.findOne({
      username: req.username,
    });

    if (!user.todos.includes(todoId)) {
      return res.status(403).json({ message: "Unauthorised" });
    }

    const todos = await Todo.findById(todoId);
    if (todos) {
      res.status(200).json(todos);
    } else {
      res.status(403).json({
        msg: "No Todos Added",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/completed/:id", async (req, res) => {
  try {
    // Find the user by username and the specific todo by ID
    // const username = req.username;
    const todoId = req.params.id;
    const result = await Todo.updateOne(
      { _id: todoId },
      {
        $set: { completed: true },
      }
    );
    // console.log(result);
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Todo marked as completed." });
    } else {
      res.status(404).json({ message: "Todo not found or already completed." });
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.patch("/update/:id", userMiddleware, async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const todoId = req.params.id;

    // console.log(req);
    //Check if user is authorised to change the certain todo.
    const user = await User.findOne({
      username: req.username,
    });

    // console.log(user);
    if (!user.todos.includes(todoId)) {
      return res.status(403).json({ message: "Unauthorised" });
    }

    //updating the todo
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    res.status(200).json({ updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
