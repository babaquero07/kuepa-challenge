import { Request, Response, Router } from "express";

import { validate, newLessonValidator } from "../../utils/validators";

import { verifyToken } from "../../utils/token-manager";
import { LessonService } from "./lesson.service";

const lessonRouter = Router();

const lessonService = new LessonService();

lessonRouter.post(
  "/new-lesson",
  validate(newLessonValidator),
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;

      const newLesson = await lessonService.newLesson(title, description);

      return res
        .status(201)
        .send({ ok: true, message: "Lesson created", newLesson });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ ok: false, message: "Internal server error" });
    }
  }
);

lessonRouter.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const lesson = await lessonService.getLessonById(id);

    return res.status(200).send({ ok: true, lesson });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ ok: false, message: "Internal server error" });
  }
});

export default lessonRouter;
