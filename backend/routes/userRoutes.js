import express from "express";
import { registerController,loginController,getAllUsers } from "../controllers/userController.js";
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerController);

userRouter.post("/login", loginController);

userRouter.get('/allusers',getAllUsers)
 
export default userRouter;
