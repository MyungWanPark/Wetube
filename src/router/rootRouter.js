import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controller/userController";
import { home, search } from "../controller/videoController";
import { publicMiddleware } from "../middleware";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
