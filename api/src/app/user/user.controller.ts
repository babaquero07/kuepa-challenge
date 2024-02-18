import { Request, Response, Router } from "express";

import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";

import {
  signupValidator,
  validate,
  loginValidator,
} from "../../utils/validators";

import { verifyToken } from "../../utils/token-manager";

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

      // Clear Cookie
      AuthService.clearCookie(res);

      // Create token and send it as a cookie
      AuthService.createAndSendToken(
        res,
        newUser.id,
        newUser.user,
        newUser.role,
        "7d"
      );

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

userRouter.post(
  "/login",
  validate(loginValidator),
  async (req: Request, res: Response) => {
    try {
      const { user, password } = req.body;

      const existingUser = await userService.isUserRegister(user);
      if (!existingUser) {
        return res.status(404).send({ message: "User not found" });
      } else {
        const isPasswordValid = userService.isPasswordValid(
          password,
          existingUser.password
        );

        if (!isPasswordValid) {
          return res.status(401).send({ message: "Invalid password" });
        }

        // Clear Cookie
        AuthService.clearCookie(res);

        // Create token and send it as a cookie
        AuthService.createAndSendToken(
          res,
          existingUser.id,
          existingUser.user,
          existingUser.role,
          "7d"
        );

        return res.status(200).send({
          message: "User logged in",
          user: existingUser.user,
          role: existingUser.role,
        });
      }
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Error", cause: error.message });
    }
  }
);

userRouter.get("/logout", verifyToken, async (req: Request, res: Response) => {
  try {
    // user token check
    const user = await userService.getUserById(res.locals.jwtData.id);

    if (!user) {
      return res
        .status(404)
        .send({ message: "User not registered OR Token malfunctioned" });
    } else if (user.id !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    // Clear Cookie
    AuthService.clearCookie(res);

    return res.status(200).send({ message: "User logged out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
});

userRouter.get(
  "/auth-status",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      // user token check
      const user = await userService.getUserById(res.locals.jwtData.id);

      if (!user) {
        return res
          .status(404)
          .send({ message: "User not registered OR Token malfunctioned" });
      } else if (user.id !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }

      return res.status(200).send({
        message: "ok",
        user: {
          name: user.name,
          user: user.user,
          role: user.role,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ERROR", cause: error.message });
    }
  }
);

export default userRouter;
