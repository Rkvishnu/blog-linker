import mongoose from "mongoose";
import User from './userModel.js'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is require"],
    },
    // image: {
    //   type: String,
    //   required: [true, "image is require"],
    // },
    user: {
      type: mongoose.Types.ObjectId,
      ref: User,
      require: [true, "userid is required"],
    },
  },
  { timestamps: true },
  // {
  //   strictQuery: true, 
// }
);

const blogModel = mongoose.model("Blog", blogSchema);
export default blogModel;
