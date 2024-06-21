import express from "express";
import { z } from "zod";
import { createTodo, updateTodo } from "./types";
const app = express();
const port = 3000;

app.use(express.json());



app.put("/completed", (req, res) => {});

app.get("/todos", (req, res) => {});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
