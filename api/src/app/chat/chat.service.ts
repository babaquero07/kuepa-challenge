import prisma from "../../lib/prisma";

export class ChatService {
  async newChat(lessonId: string) {
    try {
      const newChat = await prisma.chat.create({
        data: {
          lessonId,
        },
      });

      return newChat;
    } catch (error) {
      console.log(error);

      throw new Error("Error creating a new chat");
    }
  }

  async getChatByLessonId(lessonId: string) {
    try {
      const chat = await prisma.chat.findUnique({
        where: {
          lessonId,
        },
      });

      return chat;
    } catch (error) {
      console.log(error);

      throw new Error("Error getting chat by lessonId");
    }
  }
}
