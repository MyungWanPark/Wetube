import express from "express";

const userRouter = express.Router();

const handleUserEdit = (req, res) => res.send("welcome User edit!");

userRouter.get("/edit", handleUserEdit);

export default userRouter;
