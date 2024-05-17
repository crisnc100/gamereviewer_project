import { Router } from 'express';
import UserController from '../controllers/users.controller.js'; 
//API routes for user
const userRouter = Router();


userRouter.post('/register', UserController.registerUser);

userRouter.post('/login', UserController.loginUser);

userRouter.route('/users')
    .get(UserController.getAllUsers)

userRouter.route('/users/:id')
    .get(UserController.getOneUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser)

export default userRouter;
