import express from "express";
import {
  registerViews,
  postComments,
  deleteComments,
} from "../controller/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerViews);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", postComments);
apiRouter.delete("/:id([0-9a-f]{24})/commentDelete", deleteComments);
export default apiRouter;
