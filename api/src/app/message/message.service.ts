import prisma from "../../lib/prisma";

export class MessageService {
  async newMessage(userId: string, chatId: string, content: string) {
    try {
      const newMessage = await prisma.message.create({
        data: {
          userId,
          chatId,
          content,
        },
        include: {
          User: {
            select: {
              name: true,
              role: true,
            },
          },
        },
      });

      return newMessage;
    } catch (error) {
      console.log(error);

      throw new Error("Error creating a new message");
    }
  }
}
