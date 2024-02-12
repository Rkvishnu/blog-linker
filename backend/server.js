import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogROutes.js"; // Check the filename for typos.

dotenv.config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // or the address where your client is hosted
};


app.use(cors(corsOptions));
app.use(express.json());
// app.use(morgan("dev")); 

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

const PORT = 8000;
// const MONGO_URL = 'mongodb://127.0.0.1:27017/my-blogs-db';
const MONGO_URI = 'mongodb://mongo:27017/my-blogs-db';


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Database');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
