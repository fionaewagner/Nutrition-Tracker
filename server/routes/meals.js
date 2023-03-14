import express  from "express";
import { createMeal, deleteMeal, getMeals, updateMeal } from "../controller/meals.js";


export const mealRouter = express.Router()

mealRouter.route("/").get(getMeals);
mealRouter.route("/create").post(createMeal);
mealRouter.delete('/:_id',deleteMeal);
mealRouter.patch('/:_id', updateMeal);