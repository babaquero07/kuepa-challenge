import { Request, Response, Router } from "express";

import { verifyToken } from "../../utils/token-manager";
import { validate, newMessageValidator } from "../../utils/validators";

import { MessageService } from "./message.service";

const messageRouter = Router();

const messageService = new MessageService();

messageRouter.post(
  "/new-message",
  validate(newMessageValidator),
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { chatId, content } = req.body;
      const userId = res.locals.jwtData.id;

      const newMessage = await messageService.newMessage(
        userId,
        chatId,
        content
      );

      return res
        .status(201)
        .send({ ok: true, message: "Message created", newMessage });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ ok: false, message: "Internal server error" });
    }
  }
);

export default messageRouter;
