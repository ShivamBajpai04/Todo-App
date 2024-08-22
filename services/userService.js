import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createUser = async ({ username, password }) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser = new User({ username, password });
  await newUser.save();
  return newUser;
};

export const authenticateUser = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user || !(await user.isValidPassword(password))) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { token };
};
