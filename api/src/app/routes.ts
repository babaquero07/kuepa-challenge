import { Router } from "express";

import userRoutes from "./user/user.controller";

export const routes = Router();

routes.use("/user", userRoutes);

export default routes;
