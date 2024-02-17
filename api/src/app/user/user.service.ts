import prisma from "../../lib/prisma";
import bcryptjs from "bcryptjs";

export class UserService {
  async isUserRegister(user: string) {
    const userSearch = await prisma.user.findFirst({
      where: {
        user,
      },
    });

    return userSearch ?? false;
  }

  async signUp(name: string, user: string, password: string) {
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          user,
          password: bcryptjs.hashSync(password),
        },
        select: {
          id: true,
          name: true,
          user: true,
          role: true,
        },
      });

      return newUser;
    } catch (error) {
      console.log(error);

      throw new Error("Error creating an user");
    }
  }
}
