import express from "express";
import router from "./routes/userRoutes.js";
import cors from "cors";
import "dotenv/config";

import { connectToDB } from "./db/index.js";

const userRouter = router;
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", userRouter);

connectToDB();

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
