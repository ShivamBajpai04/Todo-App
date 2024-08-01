import express from "express";
import { z } from "zod";
import router from "./routes/userRoutes.js";
import cors from "cors"

const userRouter = router;
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", userRouter);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
