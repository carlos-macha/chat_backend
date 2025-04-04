import prisma from "../../database/prismaClient";

export class UserService {
    private static instance: UserService;

    private constructor() { }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async indexServer() {
        const users = await prisma.user.findMany();

        if (!users) throw new Error("no user found");

        return { users };
    }

    async findUserEmailServer(email: string) {
        try {
            const user = await prisma.user.findUnique({ where: { email: email } });

            return { user };
        } catch (error) {
            return {error: error};
        }
    }
};
