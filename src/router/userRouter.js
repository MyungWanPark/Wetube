import express from "express";
import {
  edit,
  see,
  logout,
  startWithGithub,
  finishWithGithub,
} from "../controller/userController";
const userRouter = express.Router();

userRouter.get("/:id(\\d+)", see);
userRouter.get("/edit", edit);
userRouter.get("/logout", logout);
userRouter.get("/github/start", startWithGithub);
userRouter.get("/github/finish", finishWithGithub);

export default userRouter;
