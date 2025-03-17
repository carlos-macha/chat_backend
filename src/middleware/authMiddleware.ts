import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: number;
}

class AuthMiddleware {
    static verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
        const token = req.header("Authorization")?.split(" ")[1];

        try {
            if (!token) {
                return next({ status: 401, message: "Token não fornecido" });
            }

            const decoded = jwt.verify(token!, process.env.JWT_SECRET as string) as jwt.JwtPayload;

            req.userId = decoded.userId;
            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return next({ status: 401, message: "Token expirado" });
            }

            if (error instanceof jwt.JsonWebTokenError) {
                return next({ status: 401, message: "Token inválido" });
            }

            return next({ status: 500, message: "Erro interno ao processar o token" });
        }
    }
}

export default AuthMiddleware;
