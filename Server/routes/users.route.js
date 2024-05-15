import { Router } from 'express';
import UserController from '../controllers/users.controller.js'; 

const router = Router();


router.post('/register', UserController.registerUser);


router.post('/login', UserController.loginUser);

export default router;
