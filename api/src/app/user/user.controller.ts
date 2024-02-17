import { Request, Response, Router } from "express";
import { UserService } from "./user.service";

import { validate, signupValidator } from "../../utils/validators";

const userService = new UserService();

const userRouter = Router();

userRouter.post(
  "/sign-up",
  validate(signupValidator),
  async (req: Request, res: Response) => {
    try {
      const { name, user, password } = req.body;

      const existingUser = await userService.isUserRegister(user);

      if (existingUser)
        return res.status(422).send({ message: "User already exists" });

      const newUser = await userService.signUp(name, user, password);

      return res
        .status(201)
        .send({ ok: true, message: "use created", newUser });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .send({ ok: false, message: "Internal server error" });
    }
  }
);

export default userRouter;
