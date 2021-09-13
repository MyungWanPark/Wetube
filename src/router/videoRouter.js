import express from "express";
import {
  see,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", see);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
