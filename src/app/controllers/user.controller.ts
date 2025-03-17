import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

class UserController {
    async createUser(req: Request, res: Response): Promise<any> {
        const { name, email, password } = req.body;
    
        try {
          const user = await userService.createUser(name, email, password);
          return res.status(201).json(user);
        } catch (error) {
          return res.status(500).json({ error: 'Failed to create user' });
        }
      }
  }

export default UserController;

