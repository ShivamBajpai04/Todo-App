import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const db = mongoose;
db.connect(process.env.DB_LINK);

const TodoSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: String,
	completed: { type: Boolean, default: false },
});

const UserSchema = new db.Schema({
	username: String,
	password: String,
	todos: [TodoSchema],
});

const User = db.model("users", UserSchema);

export { User };
