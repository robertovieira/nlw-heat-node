import prismaClient from "../prisma";
import { io } from "../app";

class CreateMessageService {
    async execute(message: string, user_id: string) {
        const messageCreate = await prismaClient.message.create({
            data: {
                message,
                user_id
            },
            include: {
                user: true
            }
        });

        const infoWS = {
            message: messageCreate.message,
            user_id: messageCreate.user_id,
            created_at: messageCreate.created_at,
            user: {
                name: messageCreate.user.name,
                avatar_url: messageCreate.user.avatar_url
            }
        };

        io.emit("new_message", infoWS);

        return messageCreate;
    }
}

export { CreateMessageService }