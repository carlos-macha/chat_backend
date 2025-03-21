import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = UserService.getInstance();

class UserController {
    private authService: UserService;

    constructor() {
        this.authService = UserService.getInstance();
    }

    public index = async (req: Request, res: Response) => {
      try {
        const result = await userService.indexServer();
        res.status(200).json(result);
      } catch(error) {
        res.status(401);
      }
    }
  }

export default UserController;

