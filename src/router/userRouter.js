import express from "express";
import {
  getEdit,
  postEdit,
  see,
  logout,
  startWithGithub,
  finishWithGithub,
} from "../controller/userController";
import { protectorMiddleware, publicMiddleware } from "../middleware";
const userRouter = express.Router();

userRouter.get("/:id(\\d+)", see);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/github/start", publicMiddleware, startWithGithub);
userRouter.get("/github/finish", publicMiddleware, finishWithGithub);

export default userRouter;
