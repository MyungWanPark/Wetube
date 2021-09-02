import express from "express";

const app = express();
const PORT = 4000;

const handleHome = (req, res) => {
  return res.send("I love you");
};

app.get("/", handleHome);

const handleListen = () =>
  console.log(`✅ I'm listening to the server! http://localhost:${PORT}`);

app.listen(PORT, handleListen);
