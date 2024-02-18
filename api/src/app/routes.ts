import { Router } from "express";

import userRoutes from "./user/user.controller";
import lessonRouter from "./lesson/lesson.controller";
import chatRouter from "./chat/chat.controller";
import messageRouter from "./message/message.controller";

export const routes = Router();

routes.use("/user", userRoutes);
routes.use("/lesson", lessonRouter);
routes.use("/chat", chatRouter);
routes.use("/message", messageRouter);

export default routes;
