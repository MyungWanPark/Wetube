import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const handleHome = (req, res) => {
  return res.send("I love you");
};

app.use(logger);
app.get("/", handleHome);

const handleListen = () =>
  console.log(`✅ I'm listening to the server! http://localhost:${PORT}`);

app.listen(PORT, handleListen);
