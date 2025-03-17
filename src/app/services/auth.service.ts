import bcrypt from "bcrypt";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../database/prismaClient";
import { z } from "zod";

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

//Padrão Singleton
export class authService {
    private static instance: authService;

    private constructor() { }

    public static getInstance(): authService {
        if (!authService.instance) {
            authService.instance = new authService();
        }
        return authService.instance;
    }

    async registerUser(email: string, password: string, name: string) {
        const parsedData = userSchema.parse({ email, password, name });

        const userExists = await prisma.user.findUnique({ where: { email: parsedData.email } });
        if (userExists) throw new Error("Email já cadastrado");

        const hashedPassword = await bcrypt.hash(parsedData.password, 10);

        const user = await prisma.user.create({
            data: { email: parsedData.email, password: hashedPassword, name: name },
        });

        //remover isso depois
        const token = jwt.sign({ userId: user!.id }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });

        return { message: "Usuário criado com sucesso", token: token };
    }

    async loginUser(email: string, password: string, userId: number) {
        try {
            const parsedData = userSchema.parse({ email, password });
            const user = await prisma.user.findUnique({ where: { email: email } });

            if (!user) {
                return { error: "usuário não existe" }
            }

            const isValidPassword = await compare(parsedData.password, user!.password);

            if(!isValidPassword) {
                return { error: "senha inválida" }
            }

            const token = jwt.sign({ userId: user!.id }, process.env.JWT_SECRET as string, {
                expiresIn: "7d",
            });

            return { token: token }
        } catch (error) {
            return { message: error };
        }

    }

    async validateToken(token: string) {
        if (!token) {
            return ({ status: 401, message: "Token não fornecido" });
        }

        try {
            const decoded = jwt.verify(token!, process.env.JWT_SECRET as string) as jwt.JwtPayload;
            
            return decoded ? { status: 200, message: "Token valido" } : {message: decoded}
        } catch (error) {
            return ({ status: 401, message: "Token inválido ou expirado" });
        }
    }
}

export default authService;
