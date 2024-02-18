import { Router } from "express";

import userRoutes from "./user/user.controller";
import lessonRouter from "./lesson/lesson.controller";

export const routes = Router();

routes.use("/user", userRoutes);
routes.use("/lesson", lessonRouter);

export default routes;
