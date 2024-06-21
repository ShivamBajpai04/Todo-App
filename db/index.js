import mongoose from "mongoose";
import { boolean } from "zod";
import dotenv from "dotenv"

dotenv.config();

const db = mongoose;
db.connect(process.env.DB_LINK);

const UserSchema = new db.Schema({
	username: String,
	password: String,
	todos: [
		{
			title: String,
			description: String,
			completed: boolean,
		},
	],
});

const User = db.model("users", UserSchema);

export { User };
