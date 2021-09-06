import express from "express";
import { edit, remove, see, logout } from "../controller/userController";
const userRouter = express.Router();

userRouter.get("/:id(\\d+)", see);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/logout", logout);

export default userRouter;
