import express from "express";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
} from "../validation/validations.js";
import checkAuth from "../utils/checkAuth.js";
import * as UserControllers from "../controlles/UserControllers.js";

const app = express();
const port = 3000;

mongoose
  .connect(
    "mongodb+srv://adaybek77:okokok12@cluster0.s1sfngm.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB OK");
  })
  .catch(() => {
    console.log("DB ERROR");
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/register", registerValidation, UserControllers.register);
app.post("/auth/login", loginValidation, UserControllers.login);
app.get("/auth/me", checkAuth, UserControllers.getMe);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
