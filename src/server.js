import express from "express";
import morgan from "morgan";
import globalRouter from "./router/globalRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

const handleListen = () =>
  console.log(`✅ I'm listening to the server! http://localhost:${PORT}`);

app.listen(PORT, handleListen);
