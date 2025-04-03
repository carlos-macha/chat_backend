import { Request, Response } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
import MessageService from '../services/message.service';

const messageService = new MessageService();

class MessageController {
    public sende = async(req: Request, res: Response) => {
        const { message, email } = req.body;
        
        const userId =  (req as AuthRequest).userId!.toString();
        const response = await messageService.messageSendService(userId, message, email);
        if (response.status === 400) {
            res.status(400).json(response.error);
        } else{
            res.json(response);
        }
        
    }

    public showMessage = async(req: Request, res: Response) => {
        const {email} = req.body;

        const userId =  (req as AuthRequest).userId!.toString();

        const response = await messageService.showMessageService(userId, email);

        if (response.status === 400) {
            res.status(400).json(response.error);
        } else{
            res.json(response);
        }

    }
}

export default MessageController;
