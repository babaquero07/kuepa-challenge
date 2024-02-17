import { Response } from "express";

import { COOKIE_NAME } from "../../utils/constants";
import { createToken } from "../../utils/token-manager";

export class AuthService {
  static clearCookie = (res: Response) => {
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });
  };

  static createAndSendToken = (
    res: Response,
    userId: string,
    user: string,
    role: string,
    expiresIn: string
  ) => {
    const token = createToken(userId, user, role, expiresIn);

    const expires = new Date();
    expires.setDate(expires.getDate() + parseInt(expiresIn));

    // Set the new cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
  };
}
