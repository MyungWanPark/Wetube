import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import apiRouter from "./router/apiRouter";
import { localMiddleware } from "./middleware";
import cors from "cors";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIES_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    // console.log(sessions);
    next();
  });
});

app.use(localMiddleware);
app.use(flash());
app.use("/upload", express.static("upload"));
app.use(
  "/static",
  express.static("assets"),
  express.static("node_modules/@ffmpeg/core/dist")
);

app.use(cors());
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);
app.use("/api", apiRouter);
export default app;
