import express  from "express";
import { getData } from "../controller/apiFetch.js";

export const apiRouter = express.Router()

apiRouter.route("/:query").get(getData);


