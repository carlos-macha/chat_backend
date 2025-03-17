import prisma from "../../database/prismaClient";

export class UserService {
    async createUser(name: string, email: string, password: string) {
        return prisma.user.create({ data: { name, email, password } })
    }
};
