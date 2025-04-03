import prisma from "../../database/prismaClient";
import { z } from "zod";

const messageSchema = z.object({
    userEmail: z.string(),
    contactEmail: z.string(),
    message: z.string()
});

class MessageService {
    async messageSendService(userId: string, message: string, contactEmail: string) {
        try {
            const user = await prisma.user.findFirst({ where: { id: userId } });

            if (!user) {
                return { status: 400, error: "user does not exist" }
            }

            const userEmail = user.email;

            const contact = await prisma.user.findFirst({ where: { email: contactEmail } });
            if (!contact) {
                return { status: 400, error: "contact does not exist" };
            }
            const contactId = contact?.id;
            const parsedData = messageSchema.parse({ userEmail, contactEmail, message });
            const messageCreate = await prisma.message.create({
                data: { senderEmail: parsedData.userEmail, receiverEmail: parsedData.contactEmail, content: parsedData.message }
            });
            return { message: "menssagem enviada" };
        } catch (error) {
            return { error: error, status: 400 };
        }
    }

    async showMessageService(userId: string, contactEmail: string) {
        try {
            const user = await prisma.user.findFirst({ where: { id: userId } });
            const userEmail = user?.email;
            const messageUser = await prisma.message.findMany({
                where: {
                    OR: [
                        { senderEmail: userEmail, receiverEmail: contactEmail },
                        { senderEmail: contactEmail, receiverEmail: userEmail },
                    ],
                },
                orderBy: { createdAt: "asc" },
                select: {
                    senderEmail: true,
                    receiverEmail: true,
                    content: true,
                    createdAt: true
                }
            });
            
            return { status: 200, message: "message", messageUser };

        } catch (error) {
            return { error: error, status: 400 };
        }
    }
}

export default MessageService;
