import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

//get all blogs
export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");

    if (!blogs) {
      res.status(400).json({
        success: false,
        message: "no blogs found",
      });
    }

    return res.status(200).json({
      success: true,
      BlogCount: blogs.length,
      message: "All blogs list",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//create blog
export const createBlogController = async (req, res) => {
  try {
    const { title, description, user } = req.body;

    //validations
    if (!title || !description || !user) {
      return res.status(400).json({
        sucess: false,
        message: "Please provide all fields",
      });
    }

    const existingUser = await userModel.findById(user);

    //validation
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new blogModel({
      title,
      description,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newBlog.save();
    return res.status(200).json({
      success: true,
      message: "Blog created successfully",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in creating blogs",
      error,
    });
  }
};

//Update Blog
export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Updating Blog",
      error,
    });
  }
};

//get blog by id
export const getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "No blog found with this id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "the blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

//delete blog
export const deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      // .findOneAndDelete(req.params.id)
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};

export const userBlogControlller = async (req, res) => {
  try {
    const userBlogs = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlogs) {
      return res.status(404).json({
        success: false,
        message: "blogs not with this id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User blogs",
      userBlogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};
