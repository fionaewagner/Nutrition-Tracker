import express from 'express'
import mongoose from 'mongoose';
import Meal from '../model/mealModel.js';

export const getMeals = async(req, res, next)=>{
    try {
        const meals = await Meal.find({})
        res.status(200).json(meals)
        
    } catch (error) {
        next(err)
    }
}
export const createMeal = async (req, res, next) => {
    const {
        mealName
    } = req.body;
  
    try {
      const meal = await Meal.create({
        mealName
      });

      await meal.save()
      res.status(201).json(meal);
  
    } catch (err) {
      next(err);
    }
  };

  export const deleteMeal = async (req, res, next) => {
        const { _id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No meal with id: ${_id}`);
    
        await Meal.findByIdAndRemove(_id);
    
        res.json({ message: "Meal deleted successfully." });
    
}

export const updateMeal = async (req, res) => {
  const { _id } = req.params;
  const {mealName} = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No meal with id: ${_id}`);

  const updatedMeal = {mealName};

  await Meal.findByIdAndUpdate(_id, updatedMeal, { new: true });

  res.json(updatedMeal);
}


const mealRouter = express.Router