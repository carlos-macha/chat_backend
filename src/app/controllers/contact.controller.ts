import { Request, Response } from 'express';
import ContactService from '../services/contact.service';
import { AuthRequest } from '../../middleware/authMiddleware';

const contactService = new ContactService();

class ContactController {
    public create = async ( req: Request, res: Response) => {

        try {
            const { email } = req.body;
            const userId =  (req as AuthRequest).userId!.toString();
            const result = await contactService.create(userId, email);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    public showContacts = async ( req: Request, res: Response ) => {
        try {
            const userId =  (req as AuthRequest).userId!.toString();
            const result = await contactService.showContactsServer(userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json
        }
    }
}

export default ContactController;
