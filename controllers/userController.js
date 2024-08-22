import { createUser, authenticateUser } from "../services/userService.js";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    await createUser({ username, password });
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { token, user } = await authenticateUser({ username, password });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};
