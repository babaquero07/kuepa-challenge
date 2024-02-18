import { Request, Response, Router } from "express";

import { verifyToken } from "../../utils/token-manager";
import { validate, newChatValidator } from "../../utils/validators";
import { ChatService } from "./chat.service";

const chatRouter = Router();
const chatService = new ChatService();

chatRouter.post(
  "/new-chat",
  validate(newChatValidator),
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { lessonId } = req.body;

      const chat = await chatService.getChatByLessonId(lessonId);
      if (chat) {
        return res
          .status(302)
          .send({ ok: true, message: "Chat already exists", chat });
      } else {
        const newChat = await chatService.newChat(lessonId);

        return res.status(201).send({ ok: true, newChat });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ ok: false, message: "Internal server error" });
    }
  }
);

export default chatRouter;
