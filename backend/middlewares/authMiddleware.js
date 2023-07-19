import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//protected routes
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    //if user is not authorised then showw erro
    //if user is authorised then go to next route

    if (user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized ",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "error in admin middlware",
    });
  }
};
