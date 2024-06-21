import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import { User } from "../db";
import userMiddleware from "../middleware/userMiddleware";
import dotenv from "dotenv";

dotenv.config();

router.post("/signup", async (req, res) => {
	// Implement user signup logic
	const username = req.body.username;
	const password = req.body.password;

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

router.post("/todo", (req, res) => {
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
});
