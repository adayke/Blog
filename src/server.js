import express from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { registerValidation } from "../validation/auth.js";
import UserModel from "../models/User.js";

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

app.post("/auth.login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: "Пользователь не найден",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return req.status(404).json({
        message: "Неверный логин или пароль",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to register!",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
