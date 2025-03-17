import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { AuthRequest } from "../../middleware/authMiddleware"; 

const AuthService = authService.getInstance();

class AuthController {
    private authService: authService;

    constructor() {
        this.authService = authService.getInstance();
    }

    public register = async (req: Request, res: Response) => {
        try {
          const { email, password, name } = req.body;
          const result = await AuthService.registerUser(email, password, name);
          res.status(201).json(result);
        } catch (error) {
          res.status(400).json({ error: error });
        }
      };

    public login = async (req: AuthRequest, res: Response): Promise<void> => {
        const userId = req.userId;
        try {
            const { email, password } = req.body;
            const result = await this.authService.loginUser(email, password, userId!);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    public validate = async(req: Request, res: Response) => {
      const token = req.headers.authorization?.split(" ")[1];

      try {
        const result = await this.authService.validateToken(token!);
        if (result.status == 401) {
          res.status(401)
        }
        res.json(result);
      } catch (error) {
        res.status(401).json({ error: error });
      }
    }
}

export default AuthController;
