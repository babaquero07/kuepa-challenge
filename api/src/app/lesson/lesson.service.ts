import prisma from "../../lib/prisma";
export class LessonService {
  async newLesson(title: string, description: string) {
    try {
      const newLesson = await prisma.lesson.create({
        data: {
          title,
          description,
        },
        // include: {
        //   Chat: {
        //     select: {
        //       id: true,
        //       lessonId: true,
        //     },
        //   },
        // }
      });

      return newLesson;
    } catch (error) {
      console.log(error);

      throw new Error("Error creating a new lesson");
    }
  }

  async getLessonById(id: string) {
    try {
      const lesson = await prisma.lesson.findUnique({
        where: {
          id,
        },
      });

      return lesson;
    } catch (error) {
      console.log(error);

      throw new Error("Error getting lesson by id");
    }
  }
}
