import { Router } from 'express';
import AuthController from '../app/controllers/auth.controller';
import AuthMiddleware from '../middleware/authMiddleware';

const authMiddleware = new AuthMiddleware();
const authController = new AuthController();
const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.get("/validate", authController.validate);

export default authRouter;
