import express from 'express'
import mongoose from 'mongoose';
import Food from '../model/foodModel.js';

export const getFoods = async(req, res, next)=>{
    try {
        const foods = await Food.find({})
        res.status(200).json(foods)
        
    } catch (error) {
        next(err)
    }
}
export const createFood = async (req, res, next) => {
    
    const {
        foodName,
        foodCal,
        foodFat,
        foodCarb,
        foodProtien,
        foodIron,
        foodCalcium,
        foodMagnesium,
        foodZinc,
        foodPotassium,
        foodServings,
        foodServingSize,
        foodMeal,
      dateEaten } = req.body;
  
    try {
      const food = await Food.create({
        foodName,
        foodCal,
        foodFat,
        foodCarb,
        foodProtien,
        foodIron,
        foodCalcium,
        foodMagnesium,
        foodZinc,
        foodPotassium,
        foodServings,
        foodServingSize,
        foodMeal,
        dateEaten
      });

      await food.save()
      res.status(201).json(food);
  
    } catch (err) {
      next(err);
    }
  };

  export const deleteFood = async (req, res, next) => {
        const { _id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No food with id: ${_id}`);
    
        await Food.findByIdAndRemove(_id);
    
        res.json({ message: "Food deleted successfully." });
    
}

export const updateFood = async (req, res) => {
  const { _id } = req.params;
  const {
    foodName,
    foodCal,
    foodFat,
    foodCarb,
    foodProtien,
    foodIron,
    foodCalcium,
    foodMagnesium,
    foodZinc,
    foodPotassium,
    foodServings,
    foodServingSize,
    foodMeal,
    dateEaten } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

  const updatedFood = {foodName,
    foodCal,
    foodFat,
    foodCarb,
    foodProtien,
    foodIron,
    foodCalcium,
    foodMagnesium,
    foodZinc,
    foodPotassium,
    foodServings,
    foodServingSize,
    foodMeal,
    dateEaten  };

  await Food.findByIdAndUpdate(_id, updatedFood, { new: true });

  res.json(updatedFood);
}


const foodRouter = express.Router