import { Router } from 'express';
import UserController from '../controllers/users.controller.js'; 
import { authenticateToken } from "../config/jwt.config.js";

const userRouter = Router();
//API routes for user

userRouter.post("/register", UserController.registerUser);

userRouter.post("/login", UserController.loginUser);

userRouter.get("/users", authenticateToken, UserController.getAllUsers);

userRouter.route("/users/:id")
    .get(authenticateToken, UserController.getOneUser)
    .put(authenticateToken, UserController.updateUser)
    .delete(authenticateToken, UserController.deleteUser)

export default userRouter;
