import express  from "express";
import { createFood, deleteFood, getFoods, updateFood } from "../controller/foods.js";


export const foodRouter = express.Router()

foodRouter.route("/").get(getFoods);
foodRouter.route("/create").post(createFood);
foodRouter.delete('/:_id',deleteFood);
foodRouter.patch('/:_id', updateFood);