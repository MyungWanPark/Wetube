import express from "express";

const videoRouter = express.Router();

const handleVideoWatch = (req, res) => res.send("welcome Video watch!");

videoRouter.get("/watch", handleVideoWatch);

export default videoRouter;
