import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedVal = jwt.verify(token, process.env.JWT_SECRET);
    req.username = decodedVal.username; // Use object format in token for more flexibility
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token verification failed" });
  }
}
