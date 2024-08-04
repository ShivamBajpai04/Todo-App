import mongoose from "mongoose";

const db = mongoose;

export const connectToDB = async () => {
  try {
    await db.connect(process.env.DB_LINK);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};


const TodoSchema = new db.Schema({
  title: { type: String, required: true, minlength: 5 },
  description: { type: String, minlength: 5 },
  completed: { type: Boolean, default: false },
});

const UserSchema = new db.Schema({
  username: String,
  password: String,
  todos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "todos",
    },
  ],
});

const User = db.model("users", UserSchema);
const Todo = db.model("todos", TodoSchema);

export { User, Todo };