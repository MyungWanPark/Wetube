import regeneratorRuntime from "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./model/Video";
import "./model/User";
import "./model/Comment";
import app from "./server";

const PORT = 4000;

const handleListen = () =>
  console.log(`✅ I'm listening to the server! http://localhost:${PORT}`);

app.listen(PORT, handleListen);
