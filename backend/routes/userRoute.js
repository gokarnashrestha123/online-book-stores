import express from "express";
import {
  handleUserLogin,
  handleUserRegister,
  handleUserAdminLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", handleUserRegister);
userRouter.post("/login", handleUserLogin);
userRouter.post("/admin", handleUserAdminLogin);

export default userRouter;
