import { Router } from "express";
import UserController from "../controllers/users.controller.js";
import { authenticateToken } from "../config/jwt.config.js";

//API routes for user
const userRouter = Router();

userRouter.post("/register", UserController.registerUser);

userRouter.post("/login", UserController.loginUser);

userRouter.get("/users", authenticateToken, UserController.getAllUsers);

userRouter
  .route("/users/:id")
  .get(UserController.getOneUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

export default userRouter;
