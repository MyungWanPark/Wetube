import express from "express";
import { registerViews } from "../controller/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerViews);

export default apiRouter;
