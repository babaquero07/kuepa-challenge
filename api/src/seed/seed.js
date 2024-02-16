import bcryptjs from "bcryptjs";

export const initialData = {
  users: [
    {
      name: "Alexander Baquero",
      user: "babaquero07",
      role: "admin",
      password: bcrypt.hashSync("@Alexander-123"),
    },
    {
      name: "Juan Perez",
      user: "jperez",
      role: "user",
      password: bcrypt.hashSync("@Juan-123"),
    },
    {
      name: "Maria Rodriguez",
      user: "mrodriguez",
      role: "user",
      password: bcrypt.hashSync("@Maria-123"),
    },
  ],
  lesson: {
    title: "First lesson",
    description: "This is the first lesson of the course",
  },
};
