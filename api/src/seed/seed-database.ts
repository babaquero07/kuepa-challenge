import prisma from "../lib/prisma";

import { initialData } from "./seed";

async function main() {
  // Delete all data
  await prisma.message.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.user.deleteMany();

  const { lesson } = initialData;

  // Create a new lesson
  await prisma.lesson.create({
    data: {
      title: lesson.title,
      description: lesson.description,
    },
  });

  // Create a new chat
  const lessons = await prisma.lesson.findMany();

  await prisma.chat.create({
    data: {
      lessonId: lessons[0].id,
    },
  });

  console.log("Data seeded");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
