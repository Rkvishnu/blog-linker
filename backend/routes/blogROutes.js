import express from "express";
const blogRouter = express.Router();
import {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogControlller,
} from "../controllers/blogController.js";

// routes
//routes
// GET || all blogs
blogRouter.get("/all-blog", getAllBlogsController);

//POST || create blog
blogRouter.post("/create-blog", createBlogController);

//Put  || update-blog
blogRouter.put("/update-blog/:id", updateBlogController);

//GET || SIngle Blog Details
blogRouter.get("/get-blog/:id", getBlogByIdController);

//DELETE || delete blog
blogRouter.delete("/delete-blog/:id", deleteBlogController);

//GET || user blog
blogRouter.get("/user-blog/:id", userBlogControlller);
export default blogRouter;
