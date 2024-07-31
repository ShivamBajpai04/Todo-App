import mongoose, { Types } from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const db = mongoose;
db.connect(process.env.DB_LINK);

const TodoSchema = new mongoose.Schema({
	title: { type: String, required: true, minlength: 10, maxlength: 100 },
	description: { type: String, minlength: 10, maxlength: 500 },
	completed: { type: Boolean, default: false },
});

const UserSchema = new db.Schema({
	username: String,
	password: String,
	todos: [{
		type: mongoose.Schema.ObjectId,
		ref: 'todos'
	}],
});

const User = db.model("users", UserSchema);
const Todo = db.model("todos", TodoSchema);

export { User, Todo };
