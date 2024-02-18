import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);

      if (!result.isEmpty()) {
        break;
      }
    }

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("user").notEmpty().withMessage("user is required").trim(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .trim(),
];

export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required").trim(),
  ...loginValidator,
];

export const newLessonValidator = [
  body("title").notEmpty().withMessage("Title is required").trim(),
  body("description").notEmpty().withMessage("Description is required").trim(),
];

export const newChatValidator = [
  body("lessonId").notEmpty().withMessage("Lesson ID is required").trim(),
];

export const newMessageValidator = [
  body("chatId").notEmpty().withMessage("Chat ID is required").trim(),
  body("content").notEmpty().withMessage("Message is required").trim(),
];
