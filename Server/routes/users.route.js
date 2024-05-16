import { Router } from 'express';
import UserController from '../controllers/users.controller.js'; 
import User from '../models/users.model.js';
//API routes for user
const router = Router();


router.post('/register', UserController.registerUser);

router.post('/login', UserController.loginUser);

router.route('/users')
    .get(UserController.getAllUsers)

router.route('/users/:id')
    .get(UserController.getOneUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser)

export default router;
