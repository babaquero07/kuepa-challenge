import prisma from "../../lib/prisma";
export class LessonService {
  async newLesson(title: string, description: string) {
    try {
      const newLesson = await prisma.lesson.create({
        data: {
          title,
          description,
        },
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
        include: {
          Chat: {
            select: {
              id: true,
              Messages: {
                orderBy: {
                  dateSent: "asc",
                },
                select: {
                  id: true,
                  content: true,
                  dateSent: true,

                  User: {
                    select: {
                      name: true,
                      role: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!lesson) {
        throw new Error("Lesson not found");
      }

      return lesson;
    } catch (error) {
      console.log(error);

      throw new Error("Error getting lesson by id");
    }
  }

  async getAllLessons() {
    try {
      const lessons = await prisma.lesson.findMany({
        orderBy: {
          title: "desc",
        },
      });

      if (lessons.length === 0) {
        throw new Error("No lessons found");
      }

      return lessons;
    } catch (error) {
      console.log(error);

      throw new Error("Error getting all lessons");
    }
  }
}
