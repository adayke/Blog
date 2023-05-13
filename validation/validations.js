import { body } from "express-validator";

export const loginValidation = [
  body("email", "Choose correct email").isEmail(),
  body("password", "Password min 5 characters").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Choose right email").isEmail(),
  body("password", "Password should be minimum 5 characters").isLength({
    min: 5,
  }),
  body("fullName", "Choose name").isLength({ min: 3 }),
  body("avatarUrl", "Choose URL").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Choose headline article").isLength({ min: 3 }).isString(),
  body("text", "Choose text for article").isLength({ min: 3 }).isString(),
  body("tags", "Incorrect format tags(choose array)").optional().isString(),
  body("imageUrl", "Choose correct URL for Image").optional().isString(),
];
