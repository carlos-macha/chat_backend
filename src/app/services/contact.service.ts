import prisma from "../../database/prismaClient";
import { z } from "zod";

const contactSchema = z.object({
    userId: z.string(),
    email: z.string().email()
});

class ContactService {
    async create(userId: string, email: string) {
        const parsedData = contactSchema.parse({userId, email});

        const contactExists = await prisma.user.findUnique({where: {email: parsedData.email}});
        
        const contact = await prisma.contact.create({
            data: {userId: parsedData.userId, contactId: contactExists!.id}
        });

        return {message: "contato salvo",};
    }

    async showContactsServer(userId: string) {
        const contacts = await prisma.contact.findMany({where: {userId: userId}});
        if(!contacts) {
            return {message: "has no contacts"};
        }
        const users = await prisma.user.findMany({where: {id: { in: contacts.map(c => c.contactId)}}});
        return {users: users.map(c => ({ email: c.email, name: c.name }))};
    }
}

export default ContactService;
