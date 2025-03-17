import { Router } from 'express';
import UserController from '../app/controllers/user.controller';

const userController = new UserController();
const userRouter = Router();

userRouter.post("/users", userController.createUser);

export default userRouter;
