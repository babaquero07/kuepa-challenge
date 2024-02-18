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

  async getUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          user: true,
          role: true,
        },
      });

      return user;
    } catch (error) {
      console.log(error);

      throw new Error("Error getting user by id");
    }
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

  isPasswordValid(password: string, userPassword: string) {
    return bcryptjs.compareSync(password, userPassword);
  }
}
