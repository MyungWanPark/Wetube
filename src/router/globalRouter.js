import express from "express";
import { join } from "../controller/userController";
import { home } from "../controller/videoController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);

export default globalRouter;
