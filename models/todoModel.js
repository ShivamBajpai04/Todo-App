import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 5 },
  description: { type: String, minlength: 5 },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
