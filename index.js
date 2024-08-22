import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./db/index.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Adjust according to your frontend domain or use '*' for all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use("/", userRoutes);

const PORT = process.env.PORT || 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
