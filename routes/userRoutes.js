import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import { User } from "../db/index.js";
import userMiddleware from "../middleware/userMiddleware.js";
import dotenv from "dotenv";
import { createTodo, userName, passWord } from "../types.js";

dotenv.config();

router.post("/signup", async (req, res) => {
	// Implement user signup logic
	const username = req.body.username;
	const password = req.body.password;

	const validUsername = userName.safeParse(username);
	const validpassword = passWord.safeParse(password);

	if (!validUsername.success || !validpassword.success) {
		res.json({
			msg: "invalid username or password",
		});
		return;
	}

	const response = await User.findOne({
		username,
		password,
	});
	if (!response) {
		await User.create({
			username,
			password,
		});

		res.status(200).json({
			msg: "Success: User Created",
		});
	} else {
		res.status(403).json({
			msg: "User already exists",
		});
	}
});

router.post("/signin", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const response = await User.findOne({
		username,
		password,
	});

	if (response) {
		const token = jwt.sign(username, process.env.JWT_SECRET);
		res.status(200).json({
			token,
		});
	} else {
		res.status(411).json({
			msg: "invalid username or password",
		});
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
		const addedTodos = await User.updateOne(
			{
				username,
			},
			{
				$push: {
					todos: {
						title: title,
						description: description,
					},
				},
			}
		);
		res.status(200).json({
			msg: "Todo added",
			todos: addedTodos.todos,
		});
	} catch (e) {
		res.json({
			msg: "Could not add todo",
		});
	}
});

export default router;
