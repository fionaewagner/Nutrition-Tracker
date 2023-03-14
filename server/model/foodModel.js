import mongoose from "mongoose";

const foodSchema=mongoose.Schema({
    foodName: String,
    foodCal: Number,
    foodFat: Number,
    foodCarb: Number,
    foodProtien: Number,
    foodIron: Number,
    foodCalcium: Number,
    foodMagnesium: Number,
    foodZinc: Number,
    foodPotassium: Number,
    foodServings: Number,
    foodServingSize: String,
    foodMeal: String,
    dateEaten: String

})

const Food = mongoose.model('Food', foodSchema);

export default Food;