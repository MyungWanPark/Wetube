import express from "express";

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Welcome Home");

globalRouter.get("/", handleHome);

export default globalRouter;
