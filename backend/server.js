import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogROutes.js";
//env config
dotenv.config();

//rest objecct
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

// Port
const PORT = process.env.PORT || 8080;
const MONGO_URL= process.env.MONGO_URL || 'mongodb://localhost:27017/my-blogs'
//listen
app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});

//mongodb connection
mongoose.connect(MONGO_URL);
console.log(
  `Connected to Mongodb Database`
);
