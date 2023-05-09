import { body } from "express-validator";

export const registerValidation = [
  body("email", "Choose right email").isEmail(),
  body("password", "Password should be minimum 5 characters").isLength({
    min: 5,
  }),
  body("fullName", "Choose name").isLength({ min: 3 }),
  body("avatarUrl", "Choose URL").optional().isURL(),
];
