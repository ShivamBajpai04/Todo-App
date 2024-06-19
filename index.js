import express from "express";
import { z } from "zod";
import { createTodo, updateTodo } from "./types";
const app = express();
const port = 3000;

app.use(express.json());

app.post("/todo", (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	const result = createTodo.safeParse({
		title,
		description,
	});
});

app.put("/completed", (req, res) => {});

app.get("/todos", (req, res) => {});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
