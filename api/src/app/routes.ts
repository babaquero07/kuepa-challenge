import { Router } from "express";

import userRoutes from "./user/user.controller";
import lessonRouter from "./lesson/lesson.controller";
import chatRouter from "./chat/chat.controller";

export const routes = Router();

routes.use("/user", userRoutes);
routes.use("/lesson", lessonRouter);
routes.use("/chat", chatRouter);

export default routes;
