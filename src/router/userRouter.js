import express from "express";
import {
  getEdit,
  postEdit,
  see,
  logout,
  startWithGithub,
  finishWithGithub,
  getChangePassword,
  postChangePassword,
} from "../controller/userController";
import {
  protectorMiddleware,
  publicMiddleware,
  avatarUpload,
} from "../middleware";
const userRouter = express.Router();

userRouter.get("/:id([0-9a-f]{24})", see);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/github/start", publicMiddleware, startWithGithub);
userRouter.get("/github/finish", publicMiddleware, finishWithGithub);

export default userRouter;
