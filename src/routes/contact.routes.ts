import { Router } from 'express';
import ContactController from '../app/controllers/contact.controller';
import AuthMiddleware from '../middleware/authMiddleware';

const contact = new ContactController();
const contactRouter = Router();

contactRouter.post("/addContact", AuthMiddleware.verifyToken, contact.create);
contactRouter.get("/showContacts", AuthMiddleware.verifyToken, contact.showContacts);

export default contactRouter;
