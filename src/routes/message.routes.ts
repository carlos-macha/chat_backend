import { Router } from 'express';
import MessageController from '../app/controllers/message.controller';
import AuthMiddleware from '../middleware/authMiddleware';

const message = new MessageController();
const messageRouter = Router();

messageRouter.post("/sendMessage", AuthMiddleware.verifyToken, message.sende);
messageRouter.post("/showMessaage", AuthMiddleware.verifyToken, message.showMessage);

export default messageRouter;
